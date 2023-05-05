import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class UpdatePostData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	title?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	content?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	view?: number

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	authorId?: string
}

export default class UpdatePostInput {
	@ApiProperty({ type: UpdatePostData })
	@Type(() => UpdatePostData)
	@ValidateNested()
	data: UpdatePostData

	@ApiProperty()
	@IsUUID()
	id: string
}
