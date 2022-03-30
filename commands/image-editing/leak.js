import ImageCommand from "../../classes/imageCommand.js";

class LeakCommand extends ImageCommand {
  static description = "Creates a fake Smash leak thumbnail";
  static aliases = ["smash", "laxchris", "ssbu", "smashleak"];

  static noImage = "no fucking image lmao";
  static command = "leak";
}

export default LeakCommand;
