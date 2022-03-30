import ImageCommand from "../../classes/imageCommand.js";

class SwirlCommand extends ImageCommand {
  static description = "Swirls an image";
  static aliases = ["whirlpool"];

  static noImage = "no fucking image lmao";
  static command = "swirl";
}

export default SwirlCommand;
