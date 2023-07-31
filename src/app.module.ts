import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { SortMiddleWare } from './middleware/SortMiddleware.middleware';
import { AuthModule } from './auth/auth.module';
// import { VerifyRegister } from './middleware/verifyRegister.middleware';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/crud_nestjs'),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SortMiddleWare).forRoutes('user');
    // consumer
    //   .apply(VerifyRegister)
    //   .forRoutes({ path: 'auth/register', method: RequestMethod.ALL });
  }
}
// providers: Có nhiệm vụ khởi tạo và cung cấp các service mà sẽ được controller trong module sẽ sử dụng đến.
// controllers: Có nhiệm vụ khởi tạo những controller đã được xác định trong module.
// imports: Có nhiệm vụ import những thành phần của một module khác mà module sẽ sử dụng.
// exports: Có nhiệm vụ export các thành phần của provider và các module khác sẻ import để sử dụn
// @Injectable() sẽ cho Nest biết đây là một class thuộc provider.
