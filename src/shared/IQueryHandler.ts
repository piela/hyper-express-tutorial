import { IQuery } from './IQuery';

export interface IQueryHandler<TQuery extends IQuery, TResult> {
  handle(command: TQuery): Promise<TResult>;
}
