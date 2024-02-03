import { NextFunction, Request, Response } from 'express';

export const verifyPKToken = (req: Request, res: Response, next: NextFunction) => {
  ((): any => {
    if (!req.header('Authorization')) {
      return res.status(401).json({
        type: 'application',
        errors:
          'Debes incluir un token PK (Authorization) en la cabecera de la petición',
      });
    }
    return next();
  })();
};
