import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateCommandCommand } from "./Commands";
import Joi, { IpOptions } from "joi";
import fs from "fs";
import path from "path";
import { Project, SyntaxKind } from "ts-morph";

const schema = Joi.object({
  moduleName: Joi.string().min(1).required().messages({
    "any.required": "Name is a required field",
  }),
  commandName: Joi.string().min(1).required().messages({
    "any.required": "Name is a required field",
  }),
});

class ValidationError extends Error {
  constructor(public errors: string[]) {
    super(errors.join(", "));
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export class CreateCommandHandler
  implements ICommandHandler<CreateCommandCommand, void>
{
  constructor() {}

  async handle(command: CreateCommandCommand): Promise<void> {
    this.validate(command);
    const name = command.moduleName;
    const rootDir = path.join(process.cwd(), "src", "modules");
    const modulePath = path.join(rootDir, name);
    console.log(modulePath);
    if (fs.existsSync(modulePath)) {
      console.log("Dodam zaraz komendę");
      // Create a new project and add the TypeScript file
      const project = new Project();
      const moduleFile= path.join(modulePath, `${name}.module.ts`);
      
      const sourceFile = project.addSourceFileAtPath(moduleFile);

      // Find the class and method to modify
      const className =   name.charAt(0).toUpperCase() + name.slice(1);;
      const methodName = "start";

      const classDeclaration = sourceFile.getClassOrThrow(className);
      const method = classDeclaration.getMethodOrThrow(methodName);

      if (method) {
        // Add a new line of code at the end of the method
        console.log("hello");
        method.addStatements(`this.commandBus.registerHandler(new ${command.commandName})(), new ${command.commandName}Handler)());`);

        // Save the changes to the file
        sourceFile.saveSync();
        console.log(
          `Added a new line of code to the method ${methodName} in class ${className} in the file ${sourceFile.getFilePath()}`
        );
      } else {
        console.error(
          `Method named ${methodName} not found in class ${className}`
        );
      }
    } else {
      console.error(`Module ${name} not exists.`);
    }
  }

  private validate(command: CreateCommandCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
