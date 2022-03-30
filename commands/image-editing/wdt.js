import ImageCommand from "../../classes/imageCommand.js";

class WhoDidThisCommand extends ImageCommand {
  static description = "Creates a \"WHO DID THIS\" meme from an image";
  static aliases = ["whodidthis"];

  static noImage = "no fucking image lmao";
  static command = "wdt";
}

export default WhoDidThisCommand;
