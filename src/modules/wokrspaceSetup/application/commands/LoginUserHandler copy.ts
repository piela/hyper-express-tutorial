import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { LoginUserCommand } from "./Commands";
import Joi from "joi";
import ValidationError from "../../../../shared/Errors/ValidationError";
import ISSO from "../services/ISSO";
import Email from "../../domain/entities/Email";
import Password, {
  IPasswordValidationStrategy,
} from "../../domain/entities/Password";

const schema =Joi.object({
  username: Joi.string().required().messages({
    'string.base': `"username" should be a type of 'text'`,
    'string.empty': `"username" cannot be an empty field`,
    'any.required': `"username" is a required field`
  }),
  password: Joi.string().required().messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.empty': `"password" cannot be an empty field`,
    'any.required': `"password" is a required field`
  }),
  realmName: Joi.string().required().messages({
    'string.base': `"realmName" should be a type of 'text'`,
    'string.empty': `"realmName" cannot be an empty field`,
    'any.required': `"realmName" is a required field`
  })
});


export class LoginUserHandler
  implements ICommandHandler<LoginUserCommand, string[]>
{
  constructor(readonly sso: ISSO) {}

  async handle(command: LoginUserCommand): Promise<string[]> {
    const { username, password, realmName } = command;
    this.validate(command);
    const tokens = await this.sso.loginUser(username, password, realmName);
    return tokens;
  }

  private validate(command: LoginUserCommand): void {
    const { error } = schema.validate(command, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
