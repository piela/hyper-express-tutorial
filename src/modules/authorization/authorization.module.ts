import { preferences } from "joi";
import CommandBus from "../../shared/CommandBus";
import { CreateUserCommand } from "../../shared/Commands";
import QueryBus from "../../shared/QueryBus";
import { CreateUserHandler } from "./application/commands/CreateUserHandler";
import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
/////////////////////////////////////////////////

// /////temporary
// export interface IPersistance {
//   save(item: any): any;
//   registerRepository(repository: IRepository):void;
// }

class IRepository {}

export class Persistance {
  constructor(private connection: any) {}

  registerRepository(repository: IRepository) {}
  save(item: any) {
    console.log("obiekt zapisany: " + JSON.stringify(item));
  }
}

const connection = null;

const persistance = new Persistance(connection);
////
export default class Authorization {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
    this.commandBus.registerHandler(
      CreateUserCommand,
      new CreateUserHandler(persistance)
    );
    console.log("Module registered");
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
