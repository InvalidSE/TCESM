import ImageCommand from "../../classes/imageCommand.js";

class CropCommand extends ImageCommand {
  static description = "Crops an image to 1:1";

  static noImage = "no fucking image lmao";
  static command = "crop";
}

export default CropCommand;
