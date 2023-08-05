import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { SortMiddleWare } from './middleware/SortMiddleware.middleware';
import { AuthModule } from './auth/auth.module';
import { HelloworldModule } from './helloworld/helloworld.module';
import { BlogModule } from './blog/blog.module';
// import { VerifyRegister } from './middleware/verifyRegister.middleware';
import { PersonModule } from './person/person.module';
import { HobbyModule } from './hobby/hobby.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    HelloworldModule,
    MongooseModule.forRoot('mongodb://localhost:27017/crud_nestjs'),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    BlogModule,
    PersonModule,
    HobbyModule,
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