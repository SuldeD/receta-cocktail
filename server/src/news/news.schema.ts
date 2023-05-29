import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class News {
  @Prop()
  title: string;

  @Prop()
  subTitle: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string;

  @Prop()
  category: string;

  @Prop()
  name: string;
}

export const newsSchema = SchemaFactory.createForClass(News);
