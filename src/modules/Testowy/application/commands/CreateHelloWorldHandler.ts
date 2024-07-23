import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateHelloWorldCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";

const schema = Joi.object({
});


export class  CreateHelloWorldHandler
  implements ICommandHandler<CreateHelloWorldCommand, void>
{
  constructor() {}

  async handle(command: CreateHelloWorldCommand): Promise<void> {
    this.validate(command);

    new Szlaban();
    this.persistance.save()
  }

  private validate(command:CreateHelloWorldCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
