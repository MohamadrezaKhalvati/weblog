import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeletePostData {
	@ApiProperty({ type: String })
	@IsUUID()
	id: string
}

export default class DeletePostInput {
	@ApiProperty({ type: DeletePostData })
	@Type(() => DeletePostData)
	@ValidateNested()
	data: DeletePostData
}
