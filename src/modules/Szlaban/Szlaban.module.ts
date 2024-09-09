
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";


export default class Szlaban {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
   
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
