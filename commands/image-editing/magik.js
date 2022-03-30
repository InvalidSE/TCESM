import ImageCommand from "../../classes/imageCommand.js";

class MagikCommand extends ImageCommand {
  static description = "Adds a content aware scale effect to an image";
  static aliases = ["imagemagic", "imagemagick", "imagemagik", "magic", "magick", "cas", "liquid"];

  static noImage = "no fucking image lmao";
  static command = "magik";
}

export default MagikCommand;
