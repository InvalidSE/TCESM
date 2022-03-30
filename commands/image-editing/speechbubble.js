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

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default SpeechBubbleCommand;
