import ImageCommand from "../../classes/imageCommand.js";

class FunkyCommand extends ImageCommand {
  params = {
    water: "./assets/images/funky.png",
    gravity: 3,
    resize: true
  };

  static description = "Adds the New Funky Mode banner to an image";
  static aliases = ["funkymode", "newfunkymode", "funkykong"];

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default FunkyCommand;
