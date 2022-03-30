import ImageCommand from "../../classes/imageCommand.js";

class UnfreezeCommand extends ImageCommand {
  params = {
    loop: true
  };

  static description = "Unfreezes an image sequence";

  static requiresGIF = true;
  static noImage = "no fucking image lmao";
  static command = "freeze";
}

export default UnfreezeCommand;
