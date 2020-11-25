import {Request, Response} from 'express';
import {Controller, Use, Get} from './decorators';
import {requireAuth} from '../middlewares/auth';

@Controller('/protected')
class ProtectedController {
  @Get('/')
  @Use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send('Its okay');
  }
}
