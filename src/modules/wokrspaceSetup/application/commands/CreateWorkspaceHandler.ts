import { ICommandHandler } from "../../../../shared/ICommandHandler";
import SSO from "../services/SSO";
import { CreateWorkspaceCommand } from "./Commands";
import Joi from "joi";
import ValidationError from "../../../../shared/Errors/ValidationError";

const schema = Joi.string()
  .pattern(/^(?=.{1,253}$)((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/)
  .required()
  .messages({
    "string.pattern.base": "Domain name must be a valid domain",
    "string.empty": "Domain name cannot be empty",
    "any.required": "Domain name is required",
  });

export class CreateWorkspaceHandler
  implements ICommandHandler<CreateWorkspaceCommand, void>
{
  constructor() {}

  async handle(command: CreateWorkspaceCommand): Promise<void> {
    const domainName = command.domianName;
    this.validate(domainName);
    await this.createDNSDomain(domainName);
    await this.configureRealm(domainName);
  }

  protected async createDNSDomain(domainName:string)
  {


  }


  protected async configureRealm(domainName: string) {
    const env = process.env;
    const sso = new SSO(
      env.KEYCLOAK_URL as string,
      env.KEYCLOAK_ADMIN_REALM as string,
      env.KEYCLOAK_ADMIN_CLIENT_ID as string,
      env.KEYCLOAK_ADMIN_CLIENT_SECRET as string
    );

    const roles = ["Admin", "Agent", "Supervisor"];
    const clientName = "www-client";

    const realmExists = await sso.realmExists(domainName);
    if (!realmExists) {
      await sso.createRealm(domainName);
      const clientUuid = await sso.createClient(domainName, clientName);
      await sso.assignClientRoles(domainName, clientUuid, roles);
      await sso.createMapper(domainName, clientUuid);
    } else {
      throw new Error("Realm already exists");
    }
  }

  private validate(domainName: string): void {
    const { error } = schema.validate(domainName, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
