import ImageCommand from "../../classes/imageCommand.js";

class ScottCommand extends ImageCommand {
  static description = "Makes Scott the Woz show off an image";
  static aliases = ["woz", "tv", "porn"];

  static noImage = "no fucking image lmao";
  static command = "scott";
}

export default ScottCommand;
