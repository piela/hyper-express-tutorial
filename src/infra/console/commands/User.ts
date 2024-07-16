import { Command } from "commander";
import { CreateUserCommand } from "../../../application/Commands";
export  function login(application: any) {
  const command = new Command("login")
    .description("Greet someone with their first and last name")
    .argument("<login>", "name of the person")
    .argument("<password>", "email of the person")
    .action(
      async (
        login: string,
        password: string
       
      ) => {

         console.log(`${login} ${password}`)
        // await application
        //   .getCommandBus()
        //   .execute(new CreateUserCommand(name, email));
      }
    );

  return command;
}

export  function createUser(application: any) {
  const command = new Command("create-user")
    .description("Greet someone with their first and last name")
    .argument("<name>", "name of the person")
    .argument("<email>", "email of the person")
    .action(
      async (
        name: string,
        email: string,
        options: { enthusiastic: boolean }
      ) => {
        await application
          .getCommandBus()
          .execute(new CreateUserCommand(name, email));
      }
    );

  return command;
}
