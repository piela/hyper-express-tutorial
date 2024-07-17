import { ICommand } from "../../../../shared/ICommand";

export class CreateWorkspaceCommand implements ICommand {
  constructor(public readonly domianName: string) {}
}