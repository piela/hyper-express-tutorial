import { Command } from "commander";
import { CreateCommandCommand } from "../../../application/commands/Commands";
import Application from "../../../../../Application";

const command = (application: Application) => {
  return new Command("command")
    .arguments("<moduleName>")
    .arguments("<commandName>")
    .description("Create a new command")
    .action((moduleName: string, commandName: string) => {
      application
        .getCommandBus()
        .execute(new CreateCommandCommand(moduleName, commandName));
    });
};

export default command;
