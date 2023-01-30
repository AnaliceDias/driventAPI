import Joi from "joi";

export const cardSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.required(),
    cvv: Joi.number().required(),
  }
});
