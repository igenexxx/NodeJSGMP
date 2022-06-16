import { dataBaseInit } from './database.loader';

export default async () => {
  await dataBaseInit();
};
