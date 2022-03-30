import ImageCommand from "../../classes/imageCommand.js";

class MemeCenterCommand extends ImageCommand {
  params = {
    water: "./assets/images/memecenter.png",
    gravity: 9,
    mc: true
  };

  static description = "Adds the MemeCenter watermark to an image";
  static aliases = ["memec", "mcenter"];

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default MemeCenterCommand;
