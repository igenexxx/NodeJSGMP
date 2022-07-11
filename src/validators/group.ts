import type { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { createValidator } from 'express-joi-validation';
import * as Joi from 'joi';

import type { GroupModel } from '../interfaces/Group';

export const validator = createValidator();

export const bodySchema = Joi.object<GroupModel>({
  name: Joi.string().alphanum().min(3).max(255),
  permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});

export interface GroupRequestSchemaModel extends ValidatedRequestSchema {
  [ContainerTypes.Body]: GroupModel;
}
