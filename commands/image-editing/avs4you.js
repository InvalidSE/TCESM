import ImageCommand from "../../classes/imageCommand.js";

class AVSCommand extends ImageCommand {
  params = {
    water: "./assets/images/avs4you.png",
    gravity: 5,
    resize: true
  };

  static description = "Adds the avs4you watermark to an image";
  static aliases = ["a4y", "avs"];

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default AVSCommand;
