import Authorization from "./modules/authorization/authorization.module";
import WorkspaceSetup from "./modules/wokrspaceSetup/workspaceSetup.module";
import CommandBus from "./shared/CommandBus";
import ICommandBus from "./shared/ICommandBus";
import IQueryBus from "./shared/IQueryBus";
import QueryBus from "./shared/QueryBus";
//import { CreateUserCommandHandler } from "./CommandHandlers/CreateUserCommandHandler";
// /////temporary
// export interface IPersistance {
//   save(item: any): any;
//   registerRepository(repository: IRepository):void;
// }

// class IRepository{}


// export class Persistance {

//   constructor(private connection: any)
//   {

//   }

//   registerRepository(repository: IRepository){}
//   save(item: any) {
//     console.log("obiekt zapisany: " + JSON.stringify(item));
//   }
// }

// const connection=null;

// const persistance=new Persistance(connection);
////
export default class Application {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {  
   
     new Authorization(this.commandBus,this.queryBus).start();
     new WorkspaceSetup(this.commandBus,this.queryBus).start();


    // this.commandBus.registerHandler(
    //   CreateUserCommand,
    //   new CreateUserCommandHandler(persistance)
    // );
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
