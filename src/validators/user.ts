import type { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { createValidator } from 'express-joi-validation';
import * as Joi from 'joi';

import type { UserModel } from '../models/User';

export const validator = createValidator();

export const querySchema = Joi.object<UserModel>({
  login: Joi.string().regex(/^\w[\w\d_$-]{3,255}/i),
  password: Joi.string().alphanum().min(8).max(255),
  age: Joi.number().min(4).max(130),
});

export interface UserRequestSchemaModel extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserModel;
}
