import { v4 as uuidv4 } from 'uuid';

// Klasa generyczna Id dla agregatów DDD
export class Id<T> {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value || uuidv4();
  }

  get value(): string {
    return this._value;
  }


  equals(id?: Id<T>): boolean {
    if (id === undefined) {
      return false;
    }
    return this._value === id.value;
  }


  toString(): string {
    return this._value;
  }
}
