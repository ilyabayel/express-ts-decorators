import {Request, Response, NextFunction} from 'express';
import {StatusCodes, ReasonPhrases} from 'http-status-codes';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  }
}
