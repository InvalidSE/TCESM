import ImageCommand from "../../classes/imageCommand.js";

class TileCommand extends ImageCommand {
  static description = "Creates a tile pattern from an image";
  static aliases = ["wall2"];

  static noImage = "no fucking image lmao";
  static command = "tile";
}

export default TileCommand;
