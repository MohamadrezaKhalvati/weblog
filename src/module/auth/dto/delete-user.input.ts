import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

class DeleteUserData {
	@ApiProperty({ required: true })
	@IsUUID()
	id: string
}

export default class DeleteUserInput {
	@ApiProperty({ required: true, type: DeleteUserData })
	@Type(() => DeleteUserData)
	@ValidateNested()
	data: DeleteUserData
}
