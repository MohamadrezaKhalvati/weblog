import { Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import CreateUserInput from './dto/create-user.input'
import DeleteUserInput from './dto/delete-user.input'
import UpdateUserInput from './dto/update-user.input'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	@ApiBody({ required: true, type: CreateUserInput })
	@ApiResponse({ status: 200 })
	async createUser() {
		return await this.authService.createUser()
	}

	@Post('updateUser')
	@ApiOperation({ operationId: 'updateUser' })
	@ApiBody({ required: true, type: UpdateUserInput })
	@ApiResponse({ status: 200 })
	async updateUser() {
		return await this.authService.updateUser()
	}

	@Post('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiBody({ required: true, type: DeleteUserInput })
	@ApiResponse({ status: 200 })
	async deleteUser() {
		return await this.authService.deleteUser()
	}

	@Get('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiResponse({ status: 200 })
	async readUser() {
		return await this.authService.readUser()
	}
}
