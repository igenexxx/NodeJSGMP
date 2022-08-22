import type { ContainerModule } from 'inversify';
import { Container } from 'inversify';

import 'reflect-metadata';

export type ConstructorModel<T> = new (...args: unknown[]) => T;

export function createTestingModule(...modules: ConstructorModel<ContainerModule>[]) {
  const container = new Container();

  container.load(...modules.map((m) => new m()));

  return container;
}
