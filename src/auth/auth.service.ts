import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh_token.schema';
import { jwtConstants } from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly modelUser: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private readonly modelRefreshToken: Model<RefreshTokenDocument>,
    private jwtService: JwtService,
  ) {}
  async register(user: CreateUserDto): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        const { email, password } = user;
        const userFind = await this.modelUser.findOne({ email });
        if (userFind)
          resolve({
            status: 'error',
            message: 'Failed! Email is already in use!',
          });
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await new this.modelUser({
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

  async RefreshToken(refresh_token: string): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        if (refresh_token === null) {
          resolve({
            status: 'error',
            message: 'Refresh Token is required!',
          });
        }
        const refresh_tokenDB = await this.modelRefreshToken.findOne({
          token: refresh_token,
        });
        if (refresh_tokenDB === null) {
          resolve({
            status: 'error',
            message: 'Refresh token is not in database!',
          });
        }
        const expiryDate: any = refresh_tokenDB?.expiryDate.getTime();
        const now: any = new Date().getTime();
        if (expiryDate < now) {
          await this.modelRefreshToken.deleteOne({
            where: {
              userId: refresh_tokenDB?.userId,
            },
          });
          resolve({
            status: 'error',
            message:
              'Refresh token was expired. Please make a new signin request',
          });
        }
        const user = await this.modelUser.findById(refresh_tokenDB?.userId);
        const payload = {
          sub: user?._id,
          username: user?.username,
        };
        resolve({
          status: 'success',
          access_token: await this.jwtService.signAsync(payload),
          refresh_token: refresh_token,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // JWT
  // async loginUser(email: string, password: string): Promise<object> {
  //   return new Promise<object>(async (resolve, reject) => {
  //     try {
  //       const userFind = await this.modelUser
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
  //             roles: userFind?.roles,
  //           };
  //           const refreshToken = uuid();
  //           let expiredAt = new Date();
  //           expiredAt.setSeconds(
  //             expiredAt.getSeconds() +
  //               parseInt(jwtConstants.jwtExpirationRefresh),
  //           );
  //           await this.modelRefreshToken.create({
  //             token: refreshToken,
  //             userId: userFind._id,
  //             expiryDate: expiredAt.getTime(),
  //             createdAt: new Date(),
  //             updatedAt: new Date(),
  //           });
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

  //PASSPORT

  async validateUser(username: string, password: string): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        const userFind = await this.modelUser
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

        if (userFind) {
          if (!isCheckPassword) {
            resolve({
              status: 'error',
              message: 'Wrong password',
            });
          } else {
            resolve({
              userInfo: userFind,
              status: 'success',
            });
          }
        } else {
          resolve({
            status: 'error',
            message: `Your Username does not exist. Please re-enter!`,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async login(user: any): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        if (user.status === 'error') {
          resolve(user);
        }
        if (user.status === 'success') {
          const { _id, username, roles, email } = user.userInfo;
          const payload = { sub: _id, username: username, roles: roles, email };
          const refreshToken = uuid();
          let expiredAt = new Date();
          expiredAt.setSeconds(
            expiredAt.getSeconds() +
              parseInt(jwtConstants.jwtExpirationRefresh),
          );
          await this.modelRefreshToken.create({
            token: refreshToken,
            userId: _id,
            expiryDate: expiredAt.getTime(),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          resolve({
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
