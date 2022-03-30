import { promises } from "fs";
import database from "../utils/database.js";
import * as logger from "../utils/logger.js";
import { commands } from "../utils/collections.js";
import { CommandInteraction } from "eris";
import { clean } from "../utils/misc.js";

// run when a slash command is executed
export default async (client, cluster, worker, ipc, interaction) => {
  if (!(interaction instanceof CommandInteraction)) return;

  // check if command exists and if it's enabled
  const command = interaction.data.name;
  const cmd = commands.get(command);
  if (!cmd) return;

  const invoker = interaction.member ?? interaction.user;

  // actually run the command
  logger.log("log", `${invoker.username} (${invoker.id}) ran command ${command}`);
  try {
    await database.addCount(command);
    // eslint-disable-next-line no-unused-vars
    const commandClass = new cmd(client, cluster, worker, ipc, { type: "application", interaction });
    const result = await commandClass.run();
    if (typeof result === "string" || (typeof result === "object" && result.embeds)) {
      await interaction.createMessage(result);
    } else if (typeof result === "object" && result.file) {
      let fileSize = 8388119;
      if (interaction.channel.guild) {
        switch (interaction.channel.guild.premiumTier) {
          case 2:
            fileSize = 52428308;
            break;
          case 3:
            fileSize = 104856616;
            break;
        }
      }
      if (result.file.length > fileSize) {
        if (process.env.TEMPDIR && process.env.TEMPDIR !== "") {
          const filename = `${Math.random().toString(36).substring(2, 15)}.${result.name.split(".")[1]}`;
          await promises.writeFile(`${process.env.TEMPDIR}/${filename}`, result.file);
          const imageURL = `${process.env.TMP_DOMAIN || "https://tmp.projectlounge.pw"}/${filename}`;
          await interaction.createMessage({
            embeds: [{
              color: 16711680,
              title: "Here's your image!",
              url: imageURL,
              image: {
                url: imageURL
              },
              footer: {
                text: "The image was hella chonk so it's not on discord"
              },
            }]
          });
        } else {
          await interaction.createMessage("the image was almost as large as your mother, so not uploading it");
        }
      } else {
        await interaction.createMessage({
          content: result.text ? result.text : undefined
        }, result);
      }
    }
  } catch (error) {
    if (error.toString().includes("Request entity too large")) {
      await interaction.createMessage("file was too large bruh");
    } else if (error.toString().includes("Job ended prematurely")) {
      await interaction.createMessage("image server died, do it again");
    } else if (error.toString().includes("Timed out")) {
      await interaction.createMessage("it timed me out, maybe make it smaller or try again");
    } else {
      logger.error(`Error occurred with slash command ${command} with arguments ${interaction.data.options}: ${error.toString()}`);
      try {
        await interaction.createMessage({
          content: "ran into an error, cry about it"
        }, [{
          file: `Message: ${await clean(error)}\n\nStack Trace: ${await clean(error.stack)}`,
          name: "error.txt"
        }]);
      } catch { /* silently ignore */ }
    }
  }
};
