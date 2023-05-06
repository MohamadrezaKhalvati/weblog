import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { GetUserId } from './decorator/get-user-id.decorator'
import CreateUserInput from './dto/create-user.input'
import DeleteUserInput from './dto/delete-user.input'
import LoginInput from './dto/login.input'
import ReadUserInput from './dto/read-user.input'
import UpdateUserInput from './dto/update-user.input'
import { IsAdmin } from './guards/is-admin.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	@ApiBody({ required: true, type: CreateUserInput })
	@ApiResponse({ status: 200 })
	async createUser(@Body() input: CreateUserInput) {
		return await this.authService.createUser(input)
	}

	@Post('updateUser')
	@UseGuards(IsAdmin)
	@ApiOperation({ operationId: 'updateUser', description: 'hello' })
	@ApiBody({ required: true, type: UpdateUserInput })
	@ApiResponse({ status: 200 })
	async updateUser(
		@Body() input: UpdateUserInput,
		@GetUserId() requesterId: string,
	) {
		return await this.authService.updateUser(input, requesterId)
	}

	@Post('deleteUser')
	@UseGuards(IsAdmin)
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiBody({ required: true, type: DeleteUserInput })
	@ApiResponse({ status: 200 })
	async deleteUser(@Body() input: DeleteUserInput) {
		return await this.authService.deleteUser(input)
	}

	@Get('readUser')
	@UseGuards(IsAdmin)
	@ApiOperation({ operationId: 'readUser' })
	@ApiResponse({ status: 200 })
	async readUser(@Body() input: ReadUserInput) {
		return await this.authService.readUser(input)
	}

	@Post('login')
	@ApiOperation({ operationId: 'login' })
	@ApiOkResponse({ status: 200 })
	async login(@Body() input: LoginInput) {
		return await this.authService.login(input)
	}
}
