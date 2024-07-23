import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateDupaCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";

const schema = Joi.object({
});


export class  CreateDupaHandler
  implements ICommandHandler<CreateDupaCommand, void>
{
  constructor() {}

  async handle(command: CreateDupaCommand): Promise<void> {
    this.validate(command);
   
  }

  private validate(command:CreateDupaCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
