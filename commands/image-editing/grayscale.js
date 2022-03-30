import ImageCommand from "../../classes/imageCommand.js";

class GrayscaleCommand extends ImageCommand {
  params() {
    return {
      color: "grayscale"
    };
  }

  static description = "Adds a grayscale filter";

  static noImage = "no fucking image lmao";
  static command = "colors";
  static aliases = ["gray", "greyscale", "grey"];
}

export default GrayscaleCommand;
