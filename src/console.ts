import { Command } from "commander";
import registerCodeGeneratorCommands from "./modules/codeGenaration/infrastructure/console";
import CommandBus from "./shared/CommandBus";
import QueryBus from "./shared/QueryBus";
import Application from "./Application";


const application = new Application(new CommandBus(), new QueryBus());
application.start();

const program=new Command();
program.name("console").description("System console").version("1.0.0");


const createCommand = registerCodeGeneratorCommands(application);
program.addCommand(createCommand);
program.parse(process.argv);
