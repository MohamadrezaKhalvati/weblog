import { ApiPropertyOptional } from '@nestjs/swagger'
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
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadUserData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	birthDay?: string

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
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional({ enum: Role })
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}

export default class ReadUserInput {
	@ApiPropertyOptional({ type: ReadUserData })
	@IsOptional()
	@Type(() => ReadUserData)
	@ValidateNested()
	data?: ReadUserData

	@ApiPropertyOptional({ type: PaginationData })
	@IsOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	pagination?: PaginationData

	@ApiPropertyOptional({ type: SortByData })
	@IsOptional()
	@Type(() => SortByData)
	@ValidateNested()
	sortBy?: SortByData
}
