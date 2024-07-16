import CommandBus from "../../shared/CommandBus";
import { CreateUserCommand } from "../../shared/Commands";
import { CreateUserCommandHandler } from "./CommandHandlers/CreateUserCommandHandler";


/////temporary
export interface IPersistance {
  save(item: any): any;
  registerRepository(repository: IRepository):void;
}

class IRepository{}


export class Persistance {

  constructor(private connection: any)
  {

  }

  registerRepository(repository: IRepository){}
  save(item: any) {
    console.log("obiekt zapisany: " + JSON.stringify(item));
  }
}

const connection=null;

const persistance=new Persistance(connection);
////
export default class Application {
  constructor(readonly commandBus: CommandBus) {}
  start() {
    this.commandBus.registerHandler(
      CreateUserCommand,
      new CreateUserCommandHandler(persistance)
    );
  }

  getCommandBus() {
    return this.commandBus;
  }
}
