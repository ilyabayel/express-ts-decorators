import {Request, Response} from 'express';
import {Get, Controller, Post, BodyValidator} from './decorators';
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
  @BodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const {email, password} = req.body;
    if (email && password && email === 'ilya' && password === 'ilya') {
      req.session = {loggedIn: true};
      res.redirect('/');
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send(`
        Email and password does not match!
        You will be redirected after <span id="counter">3</span> secs.
        <script>
          let count = 3;
          const counter = document.querySelector("#counter")
          setInterval(() => {
            if (count > 1) {
              count--;
              counter.innerHTML = count.toString();
              return;
            }
            window.location.href = "http://localhost:8000/"
          }, 1000)
        </script>
      `);
    }
  }

  @Get('/logout')
  logout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}
