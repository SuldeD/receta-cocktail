import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "../categories/category.schema";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { Collection, CollectionSchema } from "../collections/collection.schema";
import { Recipe, RecipeSchema } from "../recipes/recipe.schema";
import { Tool, ToolSchema } from "../tools/tools.schema";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Tool.name, schema: ToolSchema }]),
    CloudinaryModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
