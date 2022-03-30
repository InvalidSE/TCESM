import ImageCommand from "../../classes/imageCommand.js";

class GlobeCommand extends ImageCommand {
  static description = "Spins an image";
  static aliases = ["sphere"];

  static noImage = "no fucking image lmao";
  static command = "globe";
}

export default GlobeCommand;
