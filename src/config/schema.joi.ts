import * as Joi from 'joi';

export const ValidationSchemaEnv = Joi.object({
  MONGO_DB: Joi.string().required(),
  PORT: Joi.number().required().default(3000),
  DEFAULT_LIMIT: Joi.number().default(6),
});
