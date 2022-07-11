// import config from 'config';
import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';

import config from '../config/development';

// TODO: find another config resolver that works with ESM
// export const sequelize = new Sequelize(config.get('database'));

const sequelize = new Sequelize(config.database as Options);

(async () => {
  await sequelize.sync();
})();

export { sequelize };
