import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma, Role } from '@prisma/client'
import { createPaginationResult } from 'src/common/input/pagination.input'
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
		birthDay: true,
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

	async verifyIfUsernameNotDuplicate(username: string) {
		const duplicateduser = await this.prisma.user.findFirst({
			where: {
				username,
			},
		})
		if (duplicateduser) {
			console.log('duplicateduser')
		}
		return duplicateduser
	}

	async updateUser(input: UpdateUserInput, requesterId: string) {
		const { data, id } = input

		await this.verifyUserExistance(id)

		let myUsername = data.username
		let myEmail = data.email
		const isActive = data.isActive
		let hashedPassword = ''

		if (data.username) {
			myUsername = await this.veirfyIfUserNotDuplicated(
				requesterId,
				data.username,
			)
		}

		if (data.email) {
			myEmail = await this.verifyIsEmailNotDuplicate(id, data.email)
		}

		if (data.role || data.isActive) {
			await this.verifyAdminUser(requesterId)
		}

		if (data.password) {
			if (!data.confirmPassword) {
				// throw Errors.createClientError({
				// 	code: 11,
				// 	module: ModuleNames.AuthModule,
				// })
				console.log('err')
			}
			await this.verifyPasswordEqualToConfirmPassword(
				data.password,
				data.confirmPassword,
			)
			hashedPassword = await this.createHashedPassword(data.password)
		}

		const whereClause: Prisma.UserUpdateInput = {
			birthDay: data.birthday,
			email: myEmail,
			fullname: data.fullname,
			username: myUsername,
			password: hashedPassword,
			isActive: isActive,
		}

		// whereClause = cleanDeep(whereClause)
		const updatedUser = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: whereClause,
		})

		return updatedUser
	}

	private verifyPasswordEqualToConfirmPassword(
		password: string,
		confirmPassword: string,
	) {
		if (password !== confirmPassword) {
			console.log('password is not equal to confirm password')
		}
	}

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

	async verifyUserExistance(id: string) {
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

	async readUser(input: ReadUserInput) {
		const rawWhere = input.data || {}

		const whereClause: Prisma.UserWhereInput = {
			id: rawWhere.id,
			birthDay: rawWhere.birthDay,
			email: rawWhere.email,
			role: rawWhere.role,
			username: rawWhere.username,
			isActive: rawWhere.isActive,
			fullname: { mode: 'insensitive', contains: rawWhere.fullname },
		}

		const count = this.prisma.user.count({ where: whereClause })
		const entity = this.prisma.user.findMany({
			where: whereClause,
			...input?.sortBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async login(input: LoginInput) {
		const user = await this.verifyUserForLogin(input)
		await this.verifyUserIsActive(user.id)

		const payload: JwtPayloadType = {
			id: user.id,
			role: user.role,
			username: user.username,
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

	async verifyIfUserAdmin(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: id },
		})
		if (user) {
			if (!(user.role == Role.Admin)) {
				console.log('user is not admin')
			}
		}
		return user
	}

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

	private async verifyAdminUser(requesterId: string) {
		const foundUser = await this.prisma.user.findFirst({
			where: {
				id: requesterId,
				role: Role.Admin,
			},
		})

		if (!foundUser)
			// throw Errors.createClientError({
			// 	code: 2,
			// 	module: ModuleNames.EventModule,
			// })
			console.log('err')
	}

	private async verifyIsEmailNotDuplicate(
		requesterId: string,
		email: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { email: email },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				email = null
				return email
			} else {
				// throw Errors.createClientError({
				// 	code: 4,
				// 	module: ModuleNames.AuthModule,
				// })
				console.log('err')
			}
		} else if (duplicateUser.length > 1) {
			// throw Errors.createClientError({
			// 	code: 4,
			// 	module: ModuleNames.AuthModule,
			// })
			console.log('err')
		}

		return email.toLowerCase()
	}

	private async veirfyIfUserNotDuplicated(
		requesterId: string,
		username: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { username },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				username = null
				return username
			} else {
				console.log('username is duplicated')
			}
		} else if (duplicateUser.length > 1) {
			console.log('sdfsdf')
		}
		return username.toLowerCase()
	}
}
