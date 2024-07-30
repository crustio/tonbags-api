import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from '../utils/contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
    });
  }

  async validate({
    id,
    from,
    address,
  }: {
    id: string;
    from: string;
    address: string;
  }) {
    return {
      id,
      from,
      address,
    };
  }
}
