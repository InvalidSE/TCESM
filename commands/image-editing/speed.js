import ImageCommand from "../../classes/imageCommand.js";

class SpeedCommand extends ImageCommand {
  params() {
    const speed = parseInt(this.args[0]);
    return {
      speed: isNaN(speed) || speed < 1 ? 2 : speed
    };
  }

  static description = "Makes an image sequence faster";
  static aliases = ["speedup", "fast", "gifspeed", "faster"];
  static arguments = ["{multiplier}"];

  static requiresGIF = true;
  static noImage = "no fucking image lmao";
  static command = "speed";
}

export default SpeedCommand;
