import { ICommand } from "../../../../shared/ICommand";

export class CreateModuleCommand implements ICommand {
  constructor(readonly name: string) {}
}

export class CreateCommandCommand implements ICommand {
  constructor(readonly moduleName: string,readonly commandName: string) {}
}