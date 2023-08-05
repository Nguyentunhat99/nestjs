import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './enities/blog.entity';
//import { Blog } from './blog.schema';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => Blog)
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput._id, updateBlogInput);
  }

  /*
  

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
  */
}

// query {
//   findOne(_id:"64cda82412f241dfd93a28ac"){
//     title,
//   }
// }

// query {
// findAll{
//   title,
// }
// }

// mutation {
//  createBlog(createBlogInput:{
//   title:"",
//   description:""
//  }) {
//   title, description
//  }
// }

//test postman
// {
// 	"query":"{findAll{title}}"
// }
