import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { PaginationData } from 'src/common/input/pagination.input'
import { SortByData } from 'src/common/input/sort-by.input'

class ReadCommentData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

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

export default class ReadCommentInput {
	@ApiPropertyOptional({ type: ReadCommentData })
	@IsOptional()
	@Type(() => ReadCommentData)
	@ValidateNested()
	data?: ReadCommentData

	@ApiPropertyOptional({ type: PaginationData })
	@IsOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	pagination?: PaginationData

	@ApiPropertyOptional({ type: SortByData })
	@IsOptional()
	@Type(() => SortByData)
	@ValidateNested()
	sortBy: SortByData
}
