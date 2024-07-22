import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['token'];
          }
          console.log('Extracted token:', token);
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'SECRET',
    });
  }
  async validate(payload: any) {
    console.log('token in payload: ', payload);
    return { id: payload.id, email: payload.email };
  }
}
