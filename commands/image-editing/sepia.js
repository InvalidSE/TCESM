import ImageCommand from "../../classes/imageCommand.js";

class SepiaCommand extends ImageCommand {
  params() {
    return {
      color: "sepia"
    };
  }

  static description = "Adds a sepia filter";

  static noImage = "no fucking image lmao";
  static command = "colors";
}

export default SepiaCommand;
