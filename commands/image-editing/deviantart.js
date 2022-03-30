import ImageCommand from "../../classes/imageCommand.js";

class DeviantArtCommand extends ImageCommand {
  params = {
    water: "./assets/images/deviantart.png",
    gravity: 5,
    resize: true
  };

  static description = "Adds a DeviantArt watermark to an image";
  static aliases = ["da", "deviant"];

  static noImage = "no fucking image lmao";
  static command = "watermark";
}

export default DeviantArtCommand;
