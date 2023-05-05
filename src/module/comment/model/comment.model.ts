import { ApiProperty } from '@nestjs/swagger'

export default class CommentModel {
	@ApiProperty()
	content: string

	@ApiProperty()
	authorId: string

	@ApiProperty()
	postId: string
}
