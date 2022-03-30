import ImageCommand from "../../classes/imageCommand.js";

class FlipCommand extends ImageCommand {
  static description = "Flips an image";

  static noImage = "no fucking image lmao";
  static command = "flip";
}

export default FlipCommand;
