import ImageCommand from "../../classes/imageCommand.js";

class SharpenCommand extends ImageCommand {
  params = {
    sharp: true
  };

  static description = "Sharpens an image";
  static aliases = ["sharp"];

  static noImage = "no fucking image lmao";
  static command = "blur";
}

export default SharpenCommand;
