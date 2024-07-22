import { Command } from "commander";
import { CreateModuleCommand } from "../../../application/commands/Commands";
import Application from "../../../../../Application";

const command = (application: Application) => {
  return new Command("module")
    .arguments("<name>")
    .description("Create a new module")
    .action((name: string) => {
      
      application
        .getCommandBus()
        .execute(new CreateModuleCommand(name));
    });
};

export default command;
