import ImageCommand from "../../classes/imageCommand.js";

class WaaWCommand extends ImageCommand {
  static description = "Mirrors the right side of an image onto the left";
  static aliases = ["magik3", "mirror"];

  static noImage = "no fucking image lmao";
  static command = "mirror";
}

export default WaaWCommand;
