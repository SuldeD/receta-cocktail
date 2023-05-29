import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "../categories/category.schema";
import { Collection } from "../collections/collection.schema";
import { Tool } from "../tools/tools.schema";

@Schema()
export class Recipe {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  how_to: object[];
  @Prop()
  ingredients: object[];
  @Prop()
  image_url: string;
  @Prop()
  video_url: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: "Collection" })
  collection_id: Collection;
  @Prop({ type: mongoose.Types.ObjectId, ref: "Category" })
  categories_id: Category[];
  @Prop({ type: mongoose.Types.ObjectId, ref: "Tool" })
  tools_id: Tool[];
  @Prop()
  alcohol: boolean;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
