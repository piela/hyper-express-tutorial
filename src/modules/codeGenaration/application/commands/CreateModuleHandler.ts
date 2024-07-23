import { ICommandHandler } from "../../../../shared/ICommandHandler";
import { CreateModuleCommand } from "./Commands";
import ValidationError from "../../../../shared/Errors/ValidationError";
import { Project } from "ts-morph";
import Joi from "joi";
import fs from "fs";
import path from "path";

const schema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "any.required": "Name is a required field",
  }),
});

export class CreateModuleHandler
  implements ICommandHandler<CreateModuleCommand, void>
{
  constructor() {}

  addModuleToApp(moduleName: string, modulePath: string) {
    const project = new Project();
    const applicationFile = path.join(process.cwd(), "src", "Application.ts");
    const sourceFile = project.addSourceFileAtPath(applicationFile);

    sourceFile.addImportDeclaration({
      defaultImport: moduleName,
      moduleSpecifier: "./modules/"+moduleName+"/"+moduleName+".module",
    });

    const classDeclaration = sourceFile.getClassOrThrow("Application");
    const method = classDeclaration.getMethodOrThrow("start");
    if (method) {
      // Add a new line of code at the end of the method

      method.addStatements(
        `new ${moduleName}(this.commandBus, this.queryBus).start();`
      );

      // Save the changes to the file
      sourceFile.saveSync();
    } else {
      console.error(`Method named start not found in class Application`);
    }
  }

  async handle(command: CreateModuleCommand): Promise<void> {
    this.validate(command);
    const name = command.name;
    const rootDir = path.join(process.cwd(), "src", "modules");
    const moduleName = name.charAt(0).toUpperCase() + name.slice(1);
    const modulePath = path.join(rootDir, moduleName);
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath, { recursive: true });
      fs.mkdirSync(path.join(modulePath, "domain"), { recursive: true });
      const applicationPath = path.join(modulePath, "application");
      fs.mkdirSync(applicationPath, { recursive: true });
      const commandsPath = path.join(applicationPath, "commands");
      fs.mkdirSync(commandsPath, { recursive: true });
      fs.mkdirSync(path.join(modulePath, "infrastructure"), {
        recursive: true,
      });

      //create module
      const moduleTemplate = fs.readFileSync(
        path.join(__dirname, "templates", "module.ts.txt"),
        "utf-8"
      );

      
      fs.writeFileSync(
        path.join(modulePath, `${moduleName}.module.ts`),
        moduleTemplate.replace(/{{moduleName}}/g, moduleName)
      );

      //create Commands File
      const commandsTemplate = fs.readFileSync(
        path.join(__dirname, "templates", "Commands.ts.txt"),
        "utf-8"
      );

      fs.writeFileSync(
        path.join(applicationPath, "Commands", "Commands.ts"),
        commandsTemplate
      );
      this.addModuleToApp(moduleName, modulePath); 
      console.log(`Module ${name} created successfully.`);
    } else {
      console.error(`Module ${moduleName} already exists.`);
    }
  }

  private validate(command: CreateModuleCommand): void {
    const { error } = schema.validate(command, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new ValidationError(validationErrors);
    }
  }
}
