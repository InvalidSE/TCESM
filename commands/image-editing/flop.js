import ImageCommand from "../../classes/imageCommand.js";

class FlopCommand extends ImageCommand {
  params = {
    flop: true
  };

  static description = "Flips an image";
  static aliases = ["flip2"];

  static noImage = "no fucking image lmao";
  static command = "flip";
}

export default FlopCommand;
