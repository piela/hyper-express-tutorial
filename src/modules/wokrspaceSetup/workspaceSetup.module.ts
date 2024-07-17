import { preferences } from "joi";
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import { CreateWorkspaceCommand } from "./application/commands/Commands";
import { CreateWorkspaceHandler } from "./application/commands/CreateWorkspaceHandler";
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
export default class WorkspaceSetup {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}
  start() {
    this.commandBus.registerHandler(
      CreateWorkspaceCommand,
      new CreateWorkspaceHandler(persistance)
    );
    console.log("Module Wrokspace registered");
  }

  getQueryBus() {
    return this.queryBus;
  }

  getCommandBus() {
    return this.commandBus;
  }
}
