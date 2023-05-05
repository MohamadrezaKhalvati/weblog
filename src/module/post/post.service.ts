import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import CreatePostInput from './dto/create-post.input'
import DeletePostInput from './dto/delete-post.input'
import ReadPostInput from './dto/read-post.input'
import UpdatePostInput from './dto/update-post.input'

@Injectable()
export class PostService {
	constructor(private prisma: PrismaService) {}

	async createPost(input: CreatePostInput) {}

	async updatePost(input: UpdatePostInput) {}

	async readPost(input: ReadPostInput) {}

	async deletePost(input: DeletePostInput) {}
}
