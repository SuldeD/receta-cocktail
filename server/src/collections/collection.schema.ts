import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Collection {
  @Prop()
  name: string;
  @Prop()
  image_url: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
