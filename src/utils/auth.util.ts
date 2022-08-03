import { sign } from 'jsonwebtoken';

export const signJWT = (login: string, secret: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(
      { login, iat: Math.floor(Date.now() / 1000) },
      secret,
      { expiresIn: '1h', algorithm: 'HS256' },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          reject(err);
        }

        resolve(token as string);
      },
    );
  });
};
