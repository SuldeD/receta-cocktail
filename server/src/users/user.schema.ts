import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  picture?: string;

  @Prop()
  password?: string;

  @Prop({ default: "CLIENT" })
  role: "CLIENT" | "ADMIN" | "MODERATOR";
}

export const UserSchema = SchemaFactory.createForClass(User);
