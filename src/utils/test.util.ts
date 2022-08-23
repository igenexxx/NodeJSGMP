import type { ContainerModule } from 'inversify';
import { Container } from 'inversify';

import 'reflect-metadata';
import { signJWT } from './auth.util';

export type ConstructorModel<T> = new (...args: unknown[]) => T;

export function createTestingModule(...modules: ConstructorModel<ContainerModule>[]) {
  const container = new Container();

  container.load(...modules.map((m) => new m()));

  return container;
}

export const generateToken = async (login: string) => {
  return await signJWT(login, process.env.SECRET as string);
};
