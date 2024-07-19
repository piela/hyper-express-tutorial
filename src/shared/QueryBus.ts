import { IQuery } from './IQuery';
import { IQueryHandler } from './IQueryHandler';
import IQueryBus from './IQueryBus';

export default class QueryBus implements IQueryBus  {
  private handlers = new Map<string, IQueryHandler<IQuery, any>>();

  public registerHandler<TQuery extends IQuery, TResult>(
    queryType: new (...args: any[]) => TQuery,
    handler: IQueryHandler<TQuery, TResult>
  ): void {
    this.handlers.set(queryType.name, handler as IQueryHandler<IQuery, any>);
  }

  public async execute<TQuery extends IQuery, TResult>(query: TQuery): Promise<TResult> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(`No handler registered for query ${query.constructor.name}`);
    }
    return handler.handle(query);
  }
}
