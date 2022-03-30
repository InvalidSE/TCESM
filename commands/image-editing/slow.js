import ImageCommand from "../../classes/imageCommand.js";

class SlowCommand extends ImageCommand {
  params() {
    const speed = parseInt(this.args[0]);
    return {
      slow: true,
      speed: isNaN(speed) ? 2 : speed
    };
  }

  static description = "Makes an image sequence slower";
  static aliases = ["slowdown", "slower", "gifspeed2"];
  static arguments = ["{multiplier}"];

  static requiresGIF = true;
  static noImage = "no fucking image lmao";
  static command = "speed";
}

export default SlowCommand;
