import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class LoginData {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string
}

export default class LoginInput {
	@ApiProperty()
	@Type(() => LoginData)
	@ValidateNested()
	data: LoginInput
}
