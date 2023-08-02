import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { RoleSchema, Role } from './schemas/role.schema';

// @Global()
@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
})
export class UserModule {}
