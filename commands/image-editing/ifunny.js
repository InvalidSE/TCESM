import ImageCommand from "../../classes/imageCommand.js";

class iFunnyCommand extends ImageCommand {
  params = {
    water: "./assets/images/ifunny.png",
    gravity: 8,
    resize: true,
    append: true
  };

  static description = "Adds the iFunny watermark to an image";

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default iFunnyCommand;
