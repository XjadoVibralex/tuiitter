import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import {JwtStrategy} from './jwt.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports:[
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'yourSecretKey',
      signOptions:{expiresIn:'60m'}
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
