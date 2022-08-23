// import config from 'config';
import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';

import development from '../config/development';
import local from '../config/local';

// TODO: find another config resolver that works with ESM
// export const sequelize = new Sequelize(config.get('database'));
const config = process.env.NODE_ENV === 'development' ? development : local;

const sequelize = new Sequelize(config.database as Options);

(async () => {
  await sequelize.sync();
})();

export { sequelize };
