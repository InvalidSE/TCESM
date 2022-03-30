import ImageCommand from "../../classes/imageCommand.js";

class ReverseCommand extends ImageCommand {
  params(url, delay) {
    return {
      delay: delay ? (100 / delay.split("/")[0]) * delay.split("/")[1] : 0
    };
  }

  static description = "Reverses an image sequence";
  static aliases = ["backwards"];

  static requiresGIF = true;
  static noImage = "no fucking image lmao";
  static command = "reverse";
}

export default ReverseCommand;
