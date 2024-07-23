import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateCommandCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import Joi from "joi";
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

export class CreateCommandHandler
  implements ICommandHandler<CreateCommandCommand, void>
{
  constructor() {}

  protected createCommandHandler(
    commandHandlerName: string,
    commandName: string,
    modulePath: string
  ) {
    const moduleTemplate = fs.readFileSync(
      path.join(__dirname, "templates", "Handler.ts.txt"),
      "utf-8"
    );
    fs.writeFileSync(
      path.join(
        modulePath,
        "application",
        "commands",
        `${commandHandlerName}.ts`
      ),
      moduleTemplate
        .replace(/{{commandName}}/g, commandName)
        .replace(/{{commandHandlerName}}/g, commandHandlerName)
    );
  }

  protected createCommand(commandName: string, modulePath: string) {
    // Create a new project and add the TypeScript file
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(
      path.join(modulePath, "application", "commands", "Commands.ts")
    );

    // Add a new class declaration
    sourceFile.addClass({
      isExported: true,
      name: commandName,
      implements: ["ICommand"],
      ctors: [
        {
          parameters: [
            // {
            //   name: "name",
            //   type: "string",
            //   hasQuestionToken: false,
            //   isReadonly: true,
            // },
          ],
        },
      ],
    });

    // Save the changes to the file
    sourceFile.saveSync();
    console.log(`Added a new class to the file ${sourceFile.getFilePath()}`);
  }

  protected removeSufix(str: String) {
    const suffix = "Command";
    if (str.endsWith(suffix)) {
      return str.slice(0, -suffix.length).trim();
    }
  }

  async handle(command: CreateCommandCommand): Promise<void> {
    this.validate(command);
    const name = command.moduleName;
    const rootDir = path.join(process.cwd(), "src", "modules");
    const modulePath = path.join(rootDir, name);

    if (fs.existsSync(modulePath)) {
      console.log("Dodam zaraz komendę");
      // Create a new project and add the TypeScript file
      const project = new Project();
      const moduleFile = path.join(modulePath, `${name}.module.ts`);

      const sourceFile = project.addSourceFileAtPath(moduleFile);

      sourceFile.addImportDeclaration({
        namedImports: [command.commandName],
        moduleSpecifier: "./application/commands/Commands",
      });

      this.createCommand(command.commandName, modulePath);
      

      const commandHandler = this.removeSufix(command.commandName) + "Handler";
      this.createCommandHandler(commandHandler,command.commandName, modulePath);
      sourceFile.addImportDeclaration({
        namedImports: [commandHandler],
        moduleSpecifier: "./application/commands/" + commandHandler,
      });

      // Find the class and method to modify
      const className = name.charAt(0).toUpperCase() + name.slice(1);
      const methodName = "start";

      const classDeclaration = sourceFile.getClassOrThrow(className);
      const method = classDeclaration.getMethodOrThrow(methodName);

      if (method) {
        // Add a new line of code at the end of the method

        method.addStatements(
          `this.commandBus.registerHandler(${command.commandName}, new ${commandHandler}());`
        );

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
