
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";


export default class Szlaban {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
      console.log('New line of code added at the end');
      this.commandBus.registerHandler(new UpdateDupaCommand)(), new UpdateDupaCommandHandler)()
      this.commandBus.registerHandler(new UpdateDupaCommand)(), new UpdateDupaCommandHandler)()););
   
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
