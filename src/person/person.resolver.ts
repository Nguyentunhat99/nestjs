import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Person, PersonDocument } from './schema/person.schema';
import { PersonService } from './person.service';
import {
  CreatePersonInput,
  ListPersonInput,
  UpdatePersonInput,
} from './dto/person.inputs';
import { Hobby } from 'src/hobby/schema/hobby.schema';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => Person)
  async person(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.getById(_id);
  }

  @Query(() => [Person])
  async persons(@Args('filters', { nullable: true }) filters: ListPersonInput) {
    return this.personService.list(filters);
  }

  @Mutation(() => Person)
  async createPerson(@Args('payload') payload: CreatePersonInput) {
    return this.personService.create(payload);
  }

  @Mutation(() => Person)
  async updatePerson(@Args('payload') payload: UpdatePersonInput) {
    return this.personService.update(payload);
  }

  @Mutation(() => Person)
  async deletePerson(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.delete(_id);
  }

  @ResolveField()
  async hobbies(
    @Parent() person: PersonDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) await person.populate({ path: 'hobbies', model: Hobby.name });

    console.log(person.hobbies);
    return person.hobbies;
  }
}
// mutation {
//  createPerson(payload:{
// 	name:"Nhat",
//   hobbies: ["64ce7c1e5ca6e12a94df825b"]
// }) {
//   name
// }
// }

// query {
//   persons(filters: {}){
//     _id
//     name
//     hobbies(populate: true){
//       _id
//       name
//     }
//   }
// }

// mutation {
//  createPerson(payload:{
// 	name:"Nhat",
//   hobbies: ["64ce7c1e5ca6e12a94df825b","64ce85da5ca6e12a94df8266"]
// }) {
//   name
// }
// }
