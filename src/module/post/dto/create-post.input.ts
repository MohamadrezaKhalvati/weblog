import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator'

class CreatePostData {
	@ApiProperty({})
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	content: string

	@ApiProperty()
	@IsNumber()
	view: number

	@ApiProperty()
	@IsUUID()
	authorId: string
}

export default class CreatePostInput {
	@ApiProperty({ type: CreatePostData })
	@Type(() => CreatePostData)
	@ValidateNested()
	data: CreatePostData
}
