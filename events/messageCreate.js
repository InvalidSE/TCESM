import { promises } from "fs";
import database from "../utils/database.js";
import { log, error as _error } from "../utils/logger.js";
import { prefixCache, aliases, disabledCache, disabledCmdCache, commands } from "../utils/collections.js";
import parseCommand from "../utils/parseCommand.js";
import { clean } from "../utils/misc.js";

// run when someone sends a message
export default async (client, cluster, worker, ipc, message) => {
  // ignore other bots
  if (message.author.bot) return;

  // don't run command if bot can't send messages
  if (message.channel.guild && !message.channel.permissionsOf(client.user.id).has("sendMessages")) return;

  let prefixCandidate;
  let guildDB;
  if (message.channel.guild) {
    const cachedPrefix = prefixCache.get(message.channel.guild.id);
    if (cachedPrefix) {
      prefixCandidate = cachedPrefix;
    } else {
      guildDB = await database.getGuild(message.channel.guild.id);
      if (!guildDB) {
        guildDB = await database.fixGuild(message.channel.guild);
      }
      prefixCandidate = guildDB.prefix;
      prefixCache.set(message.channel.guild.id, guildDB.prefix);
    }
  }

  let prefix;
  let isMention = false;
  if (message.channel.guild) {
    const user = message.channel.guild.members.get(client.user.id);
    if (message.content.startsWith(user.mention)) {
      prefix = `${user.mention} `;
      isMention = true;
    } else if (message.content.startsWith(`<@${client.user.id}>`)) { // workaround for member.mention not accounting for both mention types
      prefix = `<@${client.user.id}> `;
      isMention = true;
    } else {
      prefix = prefixCandidate;
    }
  } else {
    prefix = "";
  }

  // ignore other stuff
  if (!message.content.startsWith(prefix)) return;

  // separate commands and args
  const replace = isMention ? `@${(message.channel.guild ? message.channel.guild.members.get(client.user.id).nick : client.user.username) ?? client.user.username} ` : prefix;
  const content = message.cleanContent.substring(replace.length).trim();
  const rawContent = message.content.substring(prefix.length).trim();
  const preArgs = content.split(/\s+/g);
  preArgs.shift();
  const command = rawContent.split(/\s+/g).shift().toLowerCase();
  const parsed = parseCommand(preArgs);
  const aliased = aliases.get(command);

  // don't run if message is in a disabled channel
  if (message.channel.guild) {
    const disabled = disabledCache.get(message.channel.guild.id);
    if (disabled) {
      if (disabled.includes(message.channel.id) && command != "channel") return;
    } else {
      guildDB = await database.getGuild(message.channel.guild.id);
      disabledCache.set(message.channel.guild.id, guildDB.disabled);
      if (guildDB.disabled.includes(message.channel.id) && command !== "channel") return;
    }

    const disabledCmds = disabledCmdCache.get(message.channel.guild.id);
    if (disabledCmds) {
      if (disabledCmds.includes(aliased ?? command)) return;
    } else {
      guildDB = await database.getGuild(message.channel.guild.id);
      disabledCmdCache.set(message.channel.guild.id, guildDB.disabled_commands ?? guildDB.disabledCommands);
      if ((guildDB.disabled_commands ?? guildDB.disabledCommands).includes(aliased ?? command)) return;
    }
  }

  // check if command exists and if it's enabled
  const cmd = commands.get(aliased ?? command);
  if (!cmd) return;

  // actually run the command
  log("log", `${message.author.username} (${message.author.id}) ran command ${command}`);
  const reference = {
    messageReference: {
      channelID: message.channel.id,
      messageID: message.id,
      guildID: message.channel.guild ? message.channel.guild.id : undefined,
      failIfNotExists: false
    },
    allowedMentions: {
      repliedUser: false
    }
  };
  try {
    await database.addCount(aliases.get(command) ?? command);
    const startTime = new Date();
    // eslint-disable-next-line no-unused-vars
    const commandClass = new cmd(client, cluster, worker, ipc, { type: "classic", message, args: parsed._, content: message.content.substring(prefix.length).trim().replace(command, "").trim(), specialArgs: (({ _, ...o }) => o)(parsed) }); // we also provide the message content as a parameter for cases where we need more accuracy
    const result = await commandClass.run();
    const endTime = new Date();
    if ((endTime - startTime) >= 180000) reference.allowedMentions.repliedUser = true;
    if (typeof result === "string") {
      reference.allowedMentions.repliedUser = true;
      await client.createMessage(message.channel.id, Object.assign({
        content: result
      }, reference));
    } else if (typeof result === "object" && result.embeds) {
      await client.createMessage(message.channel.id, Object.assign(result, reference));
    } else if (typeof result === "object" && result.file) {
      let fileSize = 8388119;
      if (message.channel.guild) {
        switch (message.channel.guild.premiumTier) {
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
          await client.createMessage(message.channel.id, Object.assign({
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
          }, reference));
        } else {
          await client.createMessage(message.channel.id, "the image was almost as large as your mother, so not uploading it");
        }
      } else {
        await client.createMessage(message.channel.id, Object.assign({
          content: result.text ? result.text : undefined
        }, reference), result);
      }
    }
  } catch (error) {
    if (error.toString().includes("Request entity too large")) {
      await client.createMessage(message.channel.id, Object.assign({
        content: "file was too large bruh"
      }, reference));
    } else if (error.toString().includes("Job ended prematurely")) {
      await client.createMessage(message.channel.id, Object.assign({
        content: "image server died, do it again"
      }, reference));
    } else if (error.toString().includes("Timed out")) {
      await client.createMessage(message.channel.id, Object.assign({
        content: "it timed me out, maybe make it smaller or try again"
      }, reference));
    } else {
      _error(`Error occurred with command message ${message.cleanContent}: ${error.toString()}`);
      try {
        await client.createMessage(message.channel.id, Object.assign({
          content: "ran into an error, cry about it"
        }, reference), [{
          file: `Message: ${await clean(error)}\n\nStack Trace: ${await clean(error.stack)}`,
          name: "error.txt"
        }]);
      } catch { /* silently ignore */ }
    }
  }
};
