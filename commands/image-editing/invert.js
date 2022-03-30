import ImageCommand from "../../classes/imageCommand.js";

class InvertCommand extends ImageCommand {
  static description = "Inverts an image";
  static aliases = ["inverse", "negate", "negative"];

  static noImage = "no fucking image lmao";
  static command = "invert";
}

export default InvertCommand;
