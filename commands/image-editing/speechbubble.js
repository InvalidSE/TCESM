import ImageCommand from "../../classes/imageCommand.js";

class SpeechBubbleCommand extends ImageCommand {
  params = {
    water: "./assets/images/speechbubble.png",
    gravity: "north",
    resize: true,
    yscale: 0.2,
  };

  static description = "Adds a speech bubble to an image";
  static aliases = ["speech", "sb"];

  static noImage = "https://media.discordapp.net/attachments/683228185076301862/958589894190583828/meme.gif?width=414&height=682";
  static command = "watermark";
}

export default SpeechBubbleCommand;
