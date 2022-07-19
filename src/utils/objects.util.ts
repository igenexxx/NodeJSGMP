export const getMethods = <T>(obj: T) =>
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((item) => item !== 'constructor');
