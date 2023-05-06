import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteCommentData {
	@ApiProperty()
	@IsUUID()
	id: string
}

export default class DeleteCommentInput {
	@ApiProperty({ type: DeleteCommentData })
	@Type(() => DeleteCommentData)
	@ValidateNested()
	data: DeleteCommentData
}
