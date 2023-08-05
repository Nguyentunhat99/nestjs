import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
//import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './enities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
