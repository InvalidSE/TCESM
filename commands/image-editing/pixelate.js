import ImageCommand from "../../classes/imageCommand.js";

class PixelateCommand extends ImageCommand {
  static description = "Pixelates an image";
  static aliases = ["pixel", "small"];

  static noImage = "no fucking image lmao";
  static command = "resize";
}

export default PixelateCommand;
