import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export default class UserModel {
	@ApiProperty()
	username: string

	@ApiProperty()
	email: string

	@ApiProperty()
	fullname: string

	@ApiProperty()
	role: Role

	@ApiProperty()
	isActive: string

	@ApiProperty()
	createdDate: Date

	@ApiProperty()
	updatedData: Date
}
