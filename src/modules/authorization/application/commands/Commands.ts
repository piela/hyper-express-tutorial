import { ICommand } from "../../../../shared/ICommand";

export class CreateUserCommand implements ICommand {
  constructor(public readonly name: string, public readonly email: string) {}
}