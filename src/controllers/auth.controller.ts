import {Request, Response} from 'express';
import {Get, Controller, Post} from './decorators';
import {StatusCodes} from 'http-status-codes';

@Controller('/auth')
class AuthController {
  @Get('/login')
  getLogin(req: Request, res: Response) {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email">
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password">
      </div>
      <button type="submit">Login</button>
    </form>
  `);
  }

  @Post('/login')
  postLogin(req: Request, res: Response) {
    const {email, password} = req.body;
    if (email && password && email === 'ilya' && password === 'ilya') {
      req.session = {loggedIn: true};
      res.redirect('/');
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('Email and password does not match!');
    }
  }

  @Get('/logout')
  logout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}
