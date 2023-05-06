import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsUUID, ValidateNested } from 'class-validator'

class CreateCommentData {
	@ApiProperty()
	@IsString()
	content: string

	@ApiProperty({ required: true })
	@IsUUID()
	authorId: string

	@ApiProperty({ required: true })
	@IsUUID()
	relatedPostId: string
}

export default class CreateCommentInput {
	@ApiProperty({ type: CreateCommentData })
	@Type(() => CreateCommentData)
	@ValidateNested()
	data: CreateCommentData
}
