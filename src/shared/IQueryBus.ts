import { IQuery } from "./IQuery";
import { IQueryHandler } from "./IQueryHandler";

export default interface IQueryBus {
  registerHandler<TQuery extends IQuery, TResult>(
    queryType: new (...args: any[]) => TQuery,
    handler: IQueryHandler<TQuery, TResult>
  ): void;

  execute<TQuery extends IQuery, TResult>(query: TQuery): Promise<TResult>;
}
