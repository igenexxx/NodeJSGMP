// import config from 'config';
import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';

import config from '../config/local';

// export const sequelize = new Sequelize(config.get('database'));
export const sequelize = new Sequelize(config.database as Options);
