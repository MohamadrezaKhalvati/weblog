import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadPostData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

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
}

export default class ReadPostInput {
	@ApiPropertyOptional({ type: ReadPostData })
	@IsOptional()
	@Type(() => ReadPostData)
	@ValidateNested()
	data?: ReadPostData

	@ApiPropertyOptional({ type: PaginationData })
	@IsOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	pagination?: PaginationData

	@ApiPropertyOptional({ type: SortByData })
	@IsOptional()
	@Type(() => SortByData)
	@ValidateNested()
	sortBy?: SortByData
}
