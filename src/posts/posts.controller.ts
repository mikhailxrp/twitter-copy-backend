import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createPostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  getAllPosts(@Req() req: Request) {
    return this.postService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: createPostDto, @UploadedFile() image) {
    return this.postService.createPost(dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteOnePost(@Req() req: Request) {
    return this.postService.deletePost(parseInt(req.params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateOnePost(@Body() dto: createPostDto, @Req() req: Request) {
    return this.postService.updatePost(parseInt(req.params.id), dto);
  }
}
