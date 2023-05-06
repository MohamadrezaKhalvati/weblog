import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

class UpdateCommentData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	content?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	authorId?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	relatedPostId?: string
}

export default class UpdateCommentInput {
	@ApiProperty({ type: UpdateCommentData })
	@Type(() => UpdateCommentData)
	@ValidateNested()
	data: UpdateCommentData

	@ApiProperty()
	@IsUUID()
	id: string
}
