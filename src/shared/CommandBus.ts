import { ICommand } from './ICommand';
import ICommandBus from './ICommandBus';
import { ICommandHandler } from './ICommandHandler';

export default class CommandBus implements ICommandBus  {
  private handlers = new Map<string, ICommandHandler<ICommand, any>>();

  public registerHandler<TCommand extends ICommand, TResult>(
    commandType: new (...args: any[]) => TCommand,
    handler: ICommandHandler<TCommand, TResult>
  ): void {
    this.handlers.set(commandType.name, handler as ICommandHandler<ICommand, any>);
  }

  public async execute<TCommand extends ICommand, TResult>(command: TCommand): Promise<TResult> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`No handler registered for command ${command.constructor.name}`);
    }
    return handler.handle(command);
  }
}
