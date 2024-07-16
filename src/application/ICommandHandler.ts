import { ICommand } from './ICommand';

export interface ICommandHandler<TCommand extends ICommand, TResult> {
  handle(command: TCommand): Promise<TResult>;
}
