import type { NextFunction, Request, Response } from 'express';

export type MiddlewareModel = (req: Request, res: Response, next: NextFunction) => void;
