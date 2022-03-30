import ImageCommand from "../../classes/imageCommand.js";

class BlurCommand extends ImageCommand {
  params = {
    sharp: false
  };

  static description = "Blurs an image";

  static noImage = "no fucking image lmao";
  static command = "blur";
}

export default BlurCommand;
