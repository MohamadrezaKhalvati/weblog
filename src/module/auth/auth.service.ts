import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import CreateUserInput from './dto/create-user.input'
import DeleteUserInput from './dto/delete-user.input'
import LoginInput from './dto/login.input'
import ReadUserInput from './dto/read-user.input'
import UpdateUserInput from './dto/update-user.input'
import { JwtPayloadType } from './guards/token.guard'

@Injectable()
export class AuthService {
	readOnlySelectedUser = {
		id: true,
		username: true,
		fullname: true,
		birthday: true,
		role: true,
		isActive: true,
		email: true,
	}
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async createUser(input: CreateUserInput) {
		const { data } = input
		const { confirmPassword, password } = data
		const username = data.username.toLowerCase()
		const email = data.email.toLowerCase()

		await this.verifyUserNotDuplicate(username, email)
		await this.verifyConfirmPasswordEqualToPassword(
			password,
			confirmPassword,
		)
		const hashedPassword = await this.createHashedPassword(password)

		const user = await this.prisma.user.create({
			data: {
				email: email,
				fullname: data.fullname,
				password: hashedPassword,
				username: username,
				birthDay: data.birthday,
				role: data.role,
			},
			select: this.readOnlySelectedUser,
		})
		return user
	}

	async updateUser(input: UpdateUserInput) {}

	async deleteUser(input: DeleteUserInput) {
		const { data } = input
		await this.verifyUserExistance(data.id)
		const user = await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data: {
				isActive: false,
			},
		})
		return user
	}

	private async verifyUserExistance(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		})
		if (!user) {
			console.log('verifyUserExistance')
		}
		return user
	}

	async readUser(input: ReadUserInput) {}

	private async verifyUserIsActive(id: string) {
		if (id) {
			const user = await this.prisma.user.findUnique({
				where: {
					id: id,
				},
			})
			if (!user) {
				console.log('user is not active')
			}
			return user
		}
	}

	private async verifyUserForLogin(input: LoginInput) {
		const { data } = input

		const hashedPassword = await this.createHashedPassword(data.password)

		const user = await this.prisma.user.findFirst({
			where: {
				username: data.username.toLowerCase(),
				password: hashedPassword,
			},
		})

		if (!user) {
			console.log("can't authorize")
		}
		return user
	}

	async login(input: LoginInput) {
		const user = await this.verifyUserForLogin(input)
		await this.verifyUserIsActive(user.id)

		const payload: JwtPayloadType = {
			id: user.id,
			role: user.role,
			username: user.role,
		}

		const token = await this.signPayload(payload)
		return { jwt: token }
	}

	private signPayload(input: JwtPayloadType) {
		return this.jwt.sign(input)
	}
	// TO DO
	private async createHashedPassword(password: string) {
		return password
	}

	private async verifyConfirmPasswordEqualToPassword(
		password: string,
		confirmPassword: string,
	) {
		if (!(password == confirmPassword)) {
			console.log('verifyConfirmPasswordEqualToPassword')
		}
	}
	private async verifyUserNotDuplicate(username: string, email: string) {
		if (username) {
			const duplicatedUser = await this.prisma.user.findUnique({
				where: {
					username: username,
				},
			})
			if (duplicatedUser) {
				console.log('duplicatedUser')
			}
		}
		if (email) {
			const duplicatedUser = await this.prisma.user.findUnique({
				where: {
					email: email,
				},
			})
			if (duplicatedUser) {
				console.log('duplicatedUser')
			}
		}
	}
}
