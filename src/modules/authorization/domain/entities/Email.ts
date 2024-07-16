import IValueObject from "../../../../shared/IValueObject";
import Joi from "joi";
const schema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.base": "Email should be a type of text",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is a required field",
  });

export default class Email implements IValueObject {
  constructor(protected value: string) {
    this.validate(value);
  }

  private validate(value: string): void {
    const { error } = schema.validate(value, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new Error(validationErrors.join(", "));
    }
  }
  
  getValue(): string {
    return this.value;
  }
}
