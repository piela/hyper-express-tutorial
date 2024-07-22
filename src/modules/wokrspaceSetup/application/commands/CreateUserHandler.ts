import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateUserCommand } from "./Commands";
import Joi from "joi";
import ValidationError from "../../../../shared/Errors/ValidationError";
import ISSO from "../services/ISSO";
import Email from "../../domain/entities/Email";
import Password, { IPasswordValidationStrategy } from "../../domain/entities/Password";

const schema = Joi.string()
  .pattern(/^(?=.{1,253}$)((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/)
  .required()
  .messages({
    "string.pattern.base": "Domain name must be a valid domain",
    "string.empty": "Domain name cannot be empty",
    "any.required": "Domain name is required",
  });

export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(readonly sso: ISSO, readonly passwordStrategy:IPasswordValidationStrategy) {}

  async handle(command: CreateUserCommand): Promise<void> {

    const { realmName, username, firstName, lastName, email, password } = command;
    //this.validate(command);

    const isCreated=await this.sso.createUser(
      realmName,
      username,
      firstName,
      lastName,
      new Email(email),
      new Password(password, this.passwordStrategy)
    );
  }



  private validate(command: CreateUserCommand): void {
    const { error } = schema.validate(command, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
