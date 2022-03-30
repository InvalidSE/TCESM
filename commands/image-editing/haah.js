import ImageCommand from "../../classes/imageCommand.js";

class HaaHCommand extends ImageCommand {
  params = {
    first: true
  };

  static description = "Mirrors the left side of an image onto the right";
  static aliases = ["magik4", "mirror2"];

  static noImage = "no fucking image lmao";
  static command = "mirror";
}

export default HaaHCommand;
