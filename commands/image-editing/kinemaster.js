import ImageCommand from "../../classes/imageCommand.js";

class KineMasterCommand extends ImageCommand {
  params = {
    water: "./assets/images/kinemaster.png",
    gravity: 3,
    resize: true
  };

  static description = "Adds the KineMaster watermark to an image";
  static aliases = ["kine"];

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default KineMasterCommand;
