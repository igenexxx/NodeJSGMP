import { app } from './app';
import { sequelize } from './loaders/database.loader';
const port = process.env.PORT || 3000;

const start = async () => {
  await sequelize.sync();

  console.log('env:', process.env.NODE_ENV);

  app.listen(port, () => console.log(`Server has been started on port ${port}`));
};

start();
