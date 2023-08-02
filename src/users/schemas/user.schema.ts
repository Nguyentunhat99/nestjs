import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: string[];

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ required: true })
  deleted: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
