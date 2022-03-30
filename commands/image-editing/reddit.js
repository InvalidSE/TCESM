import ImageCommand from "../../classes/imageCommand.js";
import { random } from "../../utils/misc.js";
const names = ["esmBot", "me_irl", "dankmemes", "hmmm", "gaming", "wholesome", "chonkers", "memes", "funny", "pcmasterrace", "thomastheplankengine"];

class RedditCommand extends ImageCommand {
  params() {
    return {
      caption: this.args.length === 0 ? random(names) : this.args.join(" ").replaceAll("\n", "").replaceAll(" ", "")
    };
  }

  static description = "Adds a Reddit watermark to an image";
  static arguments = ["{text}"];

  static noText = "no fucking image lmao";
  static command = "reddit";
}

export default RedditCommand;
