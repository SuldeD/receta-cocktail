import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Recipe } from "src/recipes/recipe.schema";
import { User } from "src/users/user.schema";

@Schema()
export class Comment {
  @Prop()
  comment: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  writer: User;
  @Prop({ type: mongoose.Types.ObjectId, ref: "Recipe" })
  recipe_id: Recipe;
  @Prop()
  created_at: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
