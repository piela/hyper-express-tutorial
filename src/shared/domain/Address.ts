import Joi from "joi";

const schema = Joi.object({
  houseNumber: Joi.string().required().messages({
    "string.empty": "House number cannot be empty",
  }),
  apartmentNumber: Joi.string().allow(""),
  state: Joi.string().required().messages({
    "string.empty": "State cannot be empty",
  }),
  street: Joi.string().required().messages({
    "string.empty": "Street cannot be empty",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City cannot be empty",
  }),
  zip: Joi.string()
    .pattern(/^\d{5}$/)
    .required()
    .messages({
      "string.empty": "ZIP code cannot be empty",
      "string.pattern.base": "Invalid ZIP code format",
    }),
  country: Joi.string().required().messages({
    "string.empty": "Country cannot be empty",
  }),
});

export default class Address {
  constructor(
    readonly houseNumber: string,
    readonly apartmentNumber: string,
    readonly state: string,
    readonly street: string,
    readonly city: string,
    readonly zip: string,
    readonly country: string
  ) {
    const { error } = schema.validate({
      houseNumber,
      apartmentNumber,
      state,
      street,
      city,
      zip,
      country,
    });

    if (error) {
      throw new Error(error.details[0].message);
    }
  }

  get value(): Object {
    return {
      houseNumber: this.houseNumber,
      apartmentNumber: this.apartmentNumber,
      state: this.state,
      street: this.street,
      city: this.city,
      zip: this.zip,
      country: this.country,
    };
  }

  equals(address: Address): boolean {
    return JSON.stringify(this) === JSON.stringify(Address);
  }
}
