import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { UpdateZupaCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";

const schema = Joi.object({});

export class UpdateZupaHandler
  implements ICommandHandler<UpdateZupaCommand, void>
{
  constructor() {}

  async handle(command: UpdateZupaCommand): Promise<void> {
    this.validate(command);
    console.log("UpdateZupaCommand handled");
  }

  private validate(command: UpdateZupaCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
