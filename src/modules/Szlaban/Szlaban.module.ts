
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
import { UpdateZupaCommand } from "./application/commands/Commands";
import { UpdateZupaHandler } from "./application/commands/UpdateZupaHandler";
import { UpdateZupaCommand } from "./application/commands/Commands";
import { UpdateZupaHandler } from "./application/commands/UpdateZupaHandler";

export default class Szlaban {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
      this.commandBus.registerHandler(UpdateZupaCommand, new UpdateZupaHandler());
      this.commandBus.registerHandler(UpdateZupaCommand, new UpdateZupaHandler());
 
   
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
