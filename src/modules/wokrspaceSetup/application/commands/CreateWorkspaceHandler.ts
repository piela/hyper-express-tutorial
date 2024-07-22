import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateWorkspaceCommand } from "./Commands";
import Joi from "joi";
import ValidationError from "../../../../shared/Errors/ValidationError";
import ISSO from "../services/ISSO";

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
  constructor(readonly sso:ISSO) {}

  async handle(command: CreateWorkspaceCommand): Promise<void> {
    
    const domainName = command.domainName;
    this.validate(domainName);
    await this.createDNSDomain(domainName);
    await this.configureRealm(domainName);
  }

  protected async createDNSDomain(domainName:string)
  {


  }


  protected async configureRealm(domainName: string) {
    



    const roles = ["Admin", "Agent", "Supervisor"];
    const clientName = "www-client";

    const realmExists = await this.sso.realmExists(domainName);
    if (!realmExists) {
      await this.sso.createRealm(domainName);
      const clientUuid = await this.sso.createClient(domainName, clientName);
      await this.sso.assignClientRoles(domainName, clientUuid, roles);
     // await this.sso.createMapper(domainName, clientUuid);
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
