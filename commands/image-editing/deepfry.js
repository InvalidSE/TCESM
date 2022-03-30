import ImageCommand from "../../classes/imageCommand.js";

class DeepfryCommand extends ImageCommand {
  static description = "Deep-fries an image";
  static aliases = ["fry", "jpeg2", "nuke", "df"];

  static noImage = "no fucking image lmao";
  static command = "deepfry";
}

export default DeepfryCommand;
