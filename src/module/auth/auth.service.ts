import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import CreateUserInput from './dto/create-user.input'
import DeleteUserInput from './dto/delete-user.input'
import LoginInput from './dto/login.input'
import ReadUserInput from './dto/read-user.input'
import UpdateUserInput from './dto/update-user.input'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async createUser(input: CreateUserInput) {}

	async updateUser(input: UpdateUserInput) {}

	async deleteUser(input: DeleteUserInput) {}

	async readUser(input: ReadUserInput) {}

	async login(input: LoginInput) {}
}
