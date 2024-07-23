
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
import { FirstSzablonCommand } from "./application/commands/Commands";
import { FirstSzablonHandler } from "./application/commands/FirstSzablonHandler";

export default class Szlaban {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
      this.commandBus.registerHandler(FirstSzablonCommand, new FirstSzablonHandler());
   
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
