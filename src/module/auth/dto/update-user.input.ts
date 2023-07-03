import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDateString,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class UpdateUserData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	username?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	birthday?: Date

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(Role)
	role?: Role

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	password: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	confirmPassword: string
}

export default class UpdateUserInput {
	@ApiProperty({ type: UpdateUserData })
	@Type(() => UpdateUserData)
	@ValidateNested()
	data: UpdateUserData

	@ApiProperty()
	@IsUUID()
	id: string
}
