import ImageCommand from "../../classes/imageCommand.js";

class WooWCommand extends ImageCommand {
  params = {
    vertical: true,
    first: true
  };

  static description = "Mirrors the top of an image onto the bottom";
  static aliases = ["magik5", "mirror3"];

  static noImage = "no fucking image lmao";
  static command = "mirror";
}

export default WooWCommand;
