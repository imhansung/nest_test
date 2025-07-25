import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/main')
  async getMainPage() {
    return this.userService.getMainPage();
  }

  @Post('/register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;
    return this.userService.register(email, password);
  }
}
