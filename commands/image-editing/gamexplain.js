import ImageCommand from "../../classes/imageCommand.js";

class GameXplainCommand extends ImageCommand {
  static description = "Makes a GameXplain thumbnail from an image";
  static aliases = ["gx"];

  static noImage = "no fucking image lmao";
  static command = "gamexplain";
}

export default GameXplainCommand;
