import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUser } from './request-with-user.interface';
import { createUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDto: createUserDto, @Res() res: Response) {
    const jwt = await this.authService.login(userDto);
    res.cookie('token', jwt.token, {
      httpOnly: true,
      maxAge: 36000000,
    });
    return res.send({ message: 'Авторизация прошла успешно' });
  }

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() userDto: createUserDto, @Res() res: Response) {
    const jwt = await this.authService.registration(userDto);

    res.cookie('token', jwt.token, {
      httpOnly: true,
      maxAge: 36000000,
    });
    return res.send({ message: 'Регистрация прошла успешно' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
