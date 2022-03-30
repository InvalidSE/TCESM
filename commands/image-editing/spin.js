import ImageCommand from "../../classes/imageCommand.js";

class SpinCommand extends ImageCommand {
  static description = "Spins an image";
  static aliases = ["rotate"];

  static noImage = "no fucking image lmao";
  static command = "spin";
}

export default SpinCommand;
