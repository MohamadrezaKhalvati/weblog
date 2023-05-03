import { Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	// @ApiBody({type})
	async createUser() {}
}
