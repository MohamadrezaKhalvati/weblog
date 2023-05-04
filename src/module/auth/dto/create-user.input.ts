import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsString,
	ValidateNested,
} from 'class-validator'
class CreateUserData {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	confirmPassword: string

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsDateString()
	birthday: Date

	@ApiPropertyOptional({ enum: Role })
	@IsEnum(Role)
	role?: Role
}

export default class CreateUserInput {
	@ApiProperty({ type: CreateUserData })
	@Type(() => CreateUserData)
	@ValidateNested()
	data: CreateUserData
}
