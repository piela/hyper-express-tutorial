import IValueObject from "../../../../shared/IValueObject";
import Joi from "joi";

export interface IPasswordValidationStrategy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSpecialChar: boolean;
}

function createPasswordSchema(
  strategy: IPasswordValidationStrategy
): Joi.StringSchema {
  let schema = Joi.string();

  if (strategy.minLength) {
    schema = schema
      .min(strategy.minLength)
      .message(
        `Password must be at least ${strategy.minLength} characters long.`
      );
  }

  if (strategy.requireUppercase) {
    schema = schema
      .pattern(new RegExp("(?=.*[A-Z])"))
      .message("Password must contain at least one uppercase letter.");
  }

  if (strategy.requireLowercase) {
    schema = schema
      .pattern(new RegExp("(?=.*[a-z])"))
      .message("Password must contain at least one lowercase letter.");
  }

  if (strategy.requireDigit) {
    schema = schema
      .pattern(new RegExp("(?=.*[0-9])"))
      .message("Password must contain at least one digit.");
  }

  if (strategy.requireSpecialChar) {
    schema = schema
      .pattern(new RegExp('(?=.*[!@#$%^&*(),.?":{}|<>])'))
      .message("Password must contain at least one special character.");
  }

  return schema;
}
export default class Password implements IValueObject {
  constructor(protected value: string, readonly strategy: IPasswordValidationStrategy) {
    this.validate(value);
  }

  private validate(value: string): void {
    const { error } = createPasswordSchema(this.strategy).validate(value, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new Error(validationErrors.join(", "));
    }
  }

  getValue(): string {
    return this.value;
  }

  toString()
  {
    return this.value;
  }
}
