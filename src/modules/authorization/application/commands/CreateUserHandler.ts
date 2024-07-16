import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateUserCommand } from "./Commands";
import Joi, { IpOptions } from "joi";
import Email from "../../domain/entities/Email";
import User from "../../domain/entities/User";


interface IPersistance{

  save(object: any):void;

}

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of 3",
    "string.max": "Name should have a maximum length of 30",
    "any.required": "Name is a required field",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a type of text",
      "string.email": "Email must be a valid email address",
      "string.empty": "Email cannot be an empty field",
      "any.required": "Email is a required field",
    }),
});



class ValidationError extends Error {
  constructor(public errors: string[]) {
    super(errors.join(", "));
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  constructor(readonly persistance: IPersistance) {}

  async handle(command: CreateUserCommand): Promise<void> {
    this.validate(command);
  }

  private validate(command: CreateUserCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    } else {
      this.persistance.save(new User(command.name, new Email(command.email)));
    }
  }
}
