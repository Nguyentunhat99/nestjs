import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SortUserDto } from './dto/sort-user.dto';
// import { Role } from 'src/model/role.enum';
import { RoleDocument, Role } from './schemas/role.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    @InjectModel(Role.name)
    private readonly modelRoles: Model<RoleDocument>,
  ) {}
  async loginUser(email: string, password: string): Promise<string> {
    const userFind = await this.model.findOne({ email });
    if (userFind && userFind.password && userFind.password.length > 0) {
      const match = await bcrypt.compare(password, userFind.password);
      if (match) return 'Credentials are correct!';
      return 'Invalid Credentials!';
    }
    return 'Invalid Invalid!';
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const { email, password } = user;
    const userFind = await this.model.findOne({ email });
    if (userFind) {
      return {
        status: 'error',
        message: 'Failed! Email is already in use!',
      };
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      return await new this.model({
        ...user,
        password: hashPassword,
        roles: ['user'],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        deleted: false,
      }).save();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.model
      .find({ deletedAt: null })
      .select(['-password', '-createdAt', '-updatedAt', '-deleted', '-__v'])
      .exec();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.model
      .findById(id)
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async getRoles(): Promise<Role[]> {
    return await this.modelRoles.find().select(['-_id']).exec();
  }

  async update(id: string, user: UpdateUserDto): Promise<User | null> {
    let userUpdate = { ...user, updatedAt: new Date() };
    return await this.model
      .findByIdAndUpdate(id, userUpdate)
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    let userUpdate = { deletedAt: new Date(), deleted: true };
    return await this.model
      .findByIdAndUpdate(id, userUpdate)
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async findTrashUser(): Promise<User[]> {
    return await this.model
      .find({ deleted: true })
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async destroy(id: string): Promise<User | null> {
    return await this.model
      .findByIdAndDelete(id)
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async restore(id: string, user: UpdateUserDto): Promise<User | null> {
    let userUpdate = {
      ...user,
      updatedAt: new Date(),
      deletedAt: null,
      deleted: false,
    };
    return await this.model
      .findByIdAndUpdate(id, userUpdate)
      .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
      .exec();
  }

  async handleActionForm(action: string, usersId: object) {
    switch (action) {
      case 'delete':
        await this.model.updateMany(
          { _id: { $in: usersId } },
          { deletedAt: new Date(), deleted: true },
        );
        break;
      case 'destroy':
        await this.model.deleteMany({ _id: { $in: usersId } });
        break;
      case 'restore':
        await this.model.updateMany(
          { _id: { $in: usersId } },
          { deletedAt: null, deleted: false },
        );
        break;
      default:
        break;
    }
  }
  async sort(sort: SortUserDto) {
    const { column, type } = sort;
    switch (type) {
      case 'desc':
        return await this.model.find({}).sort({ [column]: 'desc' });
        break;
      case 'asc':
        return await this.model.find({}).sort({ [column]: 'asc' });
        break;
      default:
        break;
    }
  }

  async searchTrashUsers(value: string) {
    return await this.model.find({
      $and: [
        {
          $or: [{ username: { $regex: value } }, { email: { $regex: value } }],
        },
        {
          $or: [{ deleted: true }],
        },
      ],
    });
  }

  async searchGetAllUsers(value: string) {
    return await this.model.find({
      $and: [
        {
          $or: [{ username: { $regex: value } }, { email: { $regex: value } }],
        },
        {
          $or: [{ deletedAt: null }],
        },
      ],
    });
  }
}
