import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  //JWT
  // async login(email: string, password: string): Promise<object> {
  //   return new Promise<object>(async (resolve, reject) => {
  //     try {
  //       const userFind = await this.model
  //         .findOne({ email })
  //         .select([
  //           '-createdAt',
  //           '-updatedAt',
  //           '-deleted',
  //           '-deletedAt',
  //           '-__v',
  //         ])
  //         .exec();
  //       const isCheckPassword = await bcrypt.compare(
  //         password,
  //         `${userFind?.password}`,
  //       );
  //       if (userFind) {
  //         if (!isCheckPassword) {
  //           resolve({
  //             status: 'error',
  //             message: 'Wrong password',
  //           });
  //         } else {
  //           const payload = {
  //             sub: userFind?._id,
  //             username: userFind?.username,
  //           };
  //           const refreshToken = uuid();
  //           resolve({
  //             access_token: await this.jwtService.signAsync(payload),
  //             refresh_token: refreshToken,
  //           });
  //         }
  //       } else {
  //         resolve({
  //           status: 'error',
  //           message: `Your email does not exist. Please re-enter!`,
  //         });
  //       }
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  async register(user: CreateUserDto): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        const { email, password } = user;
        const userFind = await this.model.findOne({ email });
        if (userFind)
          resolve({
            status: 'error',
            message: 'Failed! Email is already in use!',
          });
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await new this.model({
          ...user,
          password: hashPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          deleted: false,
        }).save();
        resolve({
          status: 'success',
          message: 'Registration successfully',
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //PASSPORT
  async validateUser(username: string, password: string): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        const userFind = await this.model
          .findOne({ username })
          .select([
            '-createdAt',
            '-updatedAt',
            '-deleted',
            '-deletedAt',
            '-__v',
          ])
          .exec();
        const isCheckPassword = await bcrypt.compare(
          password,
          `${userFind?.password}`,
        );
        console.log(userFind);

        if (userFind) {
          if (!isCheckPassword) {
            resolve({
              status: 'error',
              message: 'Wrong password',
            });
          } else {
            resolve({
              user: userFind,
            });
          }
        } else {
          resolve({
            status: 'error',
            message: `Your email does not exist. Please re-enter!`,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async login(user: any) {
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

