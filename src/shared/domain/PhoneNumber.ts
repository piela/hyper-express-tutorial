import Joi from 'joi';

const schema = Joi.string() 
  .pattern(/^\+?[0-9\s\-]{7,15}$/)
  .message('Invalid phone number. The number must contain between 7 and 15 digits and may be preceded by a + sign.');

export default class PhoneNumber {
    constructor (readonly phoneNumber: string ) {
        this.validate(phoneNumber);

    } 

 
private validate(value: string): void {
    const { error } = schema.validate(value, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new Error(validationErrors.join(", "));
    }
  }

get value(): Object {
    return this.phoneNumber;
  }
equals(phoneNumber: PhoneNumber): boolean {
    return this.phoneNumber === phoneNumber.value;
  }
}