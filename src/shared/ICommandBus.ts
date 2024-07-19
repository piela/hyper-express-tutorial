import { ICommand } from "./ICommand";
import { ICommandHandler } from "./ICommandHandler";

export default interface ICommandBus {
  registerHandler<TCommand extends ICommand, TResult>(
    commandType: new (...args: any[]) => TCommand,
    handler: ICommandHandler<TCommand, TResult>
  ): void;

  execute<TCommand extends ICommand, TResult>(
    command: TCommand
  ): Promise<TResult>;
}
