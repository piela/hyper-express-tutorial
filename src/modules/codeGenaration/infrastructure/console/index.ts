import Application from "../../../../Application";
import createModule from "./commands/CreateModule";
import createCommand from "./commands/CreateCommand";
import { Command } from "commander";

export default function registerCommands(application: Application) {
  const command = new Command("create");
  command.addCommand(createModule(application));
  command.addCommand(createCommand(application));
  return command; 
}
