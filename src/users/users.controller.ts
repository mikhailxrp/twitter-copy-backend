import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { createUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: createUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  getUserOne(@Req() req: Request) {
    return this.userService.getOneUser(parseInt(req.params.id));
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
