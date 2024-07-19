import { ICommand } from "../../../../shared/ICommand";

export class CreateWorkspaceCommand implements ICommand {
  constructor(readonly domainName: string) {}
}



export class CreateUserCommand implements ICommand {
  constructor(readonly realmName: string,
    readonly username: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string) {}
}