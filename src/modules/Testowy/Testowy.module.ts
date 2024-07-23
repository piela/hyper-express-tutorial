
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
import { CreateHelloWorldCommand } from "./application/commands/Commands";
import { CreateHelloWorldHandler } from "./application/commands/CreateHelloWorldHandler";

export default class Testowy {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
      this.commandBus.registerHandler(CreateHelloWorldCommand, new CreateHelloWorldHandler());
   
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
