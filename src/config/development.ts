// TODO: currently esm doesn't support
export default {
  database: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: console.log,
  },
};
