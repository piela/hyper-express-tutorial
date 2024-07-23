import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { TestCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";

const schema = Joi.object({
});


export class  TestHandler
  implements ICommandHandler<TestCommand, void>
{
  constructor() {}

  async handle(command: TestCommand): Promise<void> {
    this.validate(command);
    console.log("TestCommand handled");
   
  }

  private validate(command:TestCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
