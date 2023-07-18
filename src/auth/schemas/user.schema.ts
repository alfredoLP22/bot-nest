import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, required: true })
  nameUser: string;

  @Prop({ type: [String], default: ValidRoles.admin })
  roles: ValidRoles;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
