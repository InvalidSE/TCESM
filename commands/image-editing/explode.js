import ImageCommand from "../../classes/imageCommand.js";

class ExplodeCommand extends ImageCommand {
  params = {
    amount: -1
  };

  static description = "Explodes an image";
  static aliases = ["exp"];

  static noImage = "no fucking image lmao";
  static command = "explode";
}

export default ExplodeCommand;
