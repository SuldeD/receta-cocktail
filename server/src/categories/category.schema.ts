import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Collection } from "../collections/collection.schema";

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: "Collection" })
  collection_name: Collection;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
