import { preferences } from "joi";
import CommandBus from "../../shared/CommandBus";
import QueryBus from "../../shared/QueryBus";
import { CreateUserCommand, CreateWorkspaceCommand } from "./application/commands/Commands";
import { CreateWorkspaceHandler } from "./application/commands/CreateWorkspaceHandler";
import { CreateUserHandler } from "./application/commands/CreateUserHandler";

import ICommandBus from "../../shared/ICommandBus";
import IQueryBus from "../../shared/IQueryBus";
import SSO from "./application/services/SSO";
import dotenv from "dotenv";
import { IPasswordValidationStrategy } from "./domain/entities/Password";
dotenv.config();

const env = process.env;
const sso = new SSO(
  env.KEYCLOAK_URL as string,
  env.KEYCLOAK_ADMIN_REALM as string,
  env.KEYCLOAK_ADMIN_CLIENT_ID as string,
  env.KEYCLOAK_ADMIN_CLIENT_SECRET as string
);

class PasswordStrategy implements IPasswordValidationStrategy {
  constructor(
    readonly minLength: number,
    readonly requireUppercase: boolean,
    readonly requireLowercase: boolean,
    readonly requireDigit: boolean,
    readonly requireSpecialChar: boolean
  ) {}
}

function strToBool(value: string): boolean {
  if (value.toLowerCase() === "true") {
    return true;
  } else if (value.toLowerCase() === "false") {
    return false;
  } 
  else
  { throw new Error(`Value is nor "true" or "false"`)}
}

const passwordStrategy=new PasswordStrategy(
  parseInt(env.PASSWORD_MIN_LENGTH!),
  strToBool(env.PASSWORD_MIN_ONE_UPPERCASE!),
  strToBool(env.PASSWORD_MIN_ONE_LOWERCASE!),
  strToBool(env.PASSWORD_MIN_ONE_SPECIAL!),
  strToBool(env.PASSWORD_MIN_ONE_NUMBER!)
);

export default class WorkspaceSetup {
  constructor(readonly commandBus: ICommandBus, readonly queryBus: IQueryBus) {}
  start() {
    this.commandBus.registerHandler(
      CreateWorkspaceCommand,
      new CreateWorkspaceHandler(sso)
    );

    this.commandBus.registerHandler(
      CreateUserCommand,
      new CreateUserHandler(sso,passwordStrategy)
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
