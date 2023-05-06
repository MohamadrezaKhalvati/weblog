import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokenGuard } from './guards/token.guard'

@Module({
	imports: [
		PrismaModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET_TOKEN,
			signOptions: { expiresIn: process.env.JWT_EXPIRATION_DATE },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: TokenGuard,
		},
	],
	exports: [AuthService],
})
export class AuthModule {}
