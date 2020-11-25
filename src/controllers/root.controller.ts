import {Request, Response} from 'express';
import {Get, Controller} from './decorators';

@Controller()
class LoginController {
  @Get('/')
  getLogin(req: Request, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`<a href="/auth/logout">Log Out</a>`);
    } else {
      res.send('<a href="/auth/login">Log In</a>');
    }
  }
}
