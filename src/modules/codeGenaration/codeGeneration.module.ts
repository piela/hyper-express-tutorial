
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import { CreateModuleHandler } from "./application/commands/CreateModuleHandler";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
import { CreateCommandCommand, CreateModuleCommand } from "./application/commands/Commands";
import { CreateCommandHandler } from "./application/commands/CreateCommandHandler";

export default class CodeGeneration {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
    this.commandBus.registerHandler(
      CreateModuleCommand,
      new CreateModuleHandler()
    );

    this.commandBus.registerHandler(
      CreateCommandCommand,
      new CreateCommandHandler()
    );
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
