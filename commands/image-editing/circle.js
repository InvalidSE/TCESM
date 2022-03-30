import ImageCommand from "../../classes/imageCommand.js";

class CircleCommand extends ImageCommand {
  static description = "Applies a radial blur effect on an image";
  static aliases = ["cblur", "radial", "radialblur"];

  static noImage = "no fucking image lmao";
  static command = "circle";
}

export default CircleCommand;
