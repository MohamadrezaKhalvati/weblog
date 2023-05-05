import { ApiProperty } from '@nestjs/swagger'

export default class PostModel {
	@ApiProperty()
	title: string

	@ApiProperty()
	content: string

	@ApiProperty()
	view: number

	@ApiProperty()
	createdDate: Date

	@ApiProperty()
	updatedDate: Date
}
