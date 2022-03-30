import ImageCommand from "../../classes/imageCommand.js";

class WallCommand extends ImageCommand {
  static description = "Creates a wall from an image";

  static noImage = "no fucking image lmao";
  static command = "wall";
}

export default WallCommand;
