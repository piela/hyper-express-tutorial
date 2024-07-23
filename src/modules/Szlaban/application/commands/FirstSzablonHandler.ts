import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { FirstSzablonCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";

const schema = Joi.object({
});


export class  FirstSzablonHandler
  implements ICommandHandler<FirstSzablonCommand, void>
{
  constructor() {}

  async handle(command: FirstSzablonCommand): Promise<void> {
    this.validate(command);
    console.log("FirstSzablonCommand handled");
   
  }

  private validate(command:FirstSzablonCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
