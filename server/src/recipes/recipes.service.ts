import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../categories/category.schema";
import { Recipe } from "../recipes/recipe.schema";
import { Tool } from "../tools/tools.schema";
import { Collection } from "../collections/collection.schema";
import { CreateRecipesDto } from "./recipes.create.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Collection.name) private collectionsModel: Model<Collection>,
    @InjectModel(Category.name) private categoriesModel: Model<Category>,
    @InjectModel(Tool.name) private toolsModel: Model<Tool>,
    private readonly cloudinary: CloudinaryService
  ) {}

  allRecipe() {
    try {
      return this.recipeModel.find();
    } catch (err) {
      return err;
    }
  }

  async length() {
    const data = await this.recipeModel.find();
    return data.length;
  }

  async findRecipe(id: string) {
    try {
      return await this.recipeModel.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  }

  allId() {
    try {
      return this.recipeModel.find().select({ _id: 1 });
    } catch (err) {
      return err;
    }
  }

  cardRecipe() {
    try {
      return this.recipeModel
        .find()
        .select({ _id: 1, name: 1, categories_id: 1, image_url: 1 })
        .limit(8);
    } catch (err) {
      return err;
    }
  }

  recommend() {
    try {
      return this.recipeModel
        .find({ collection_id: "Difficulty" })
        .select({
          _id: 1,
          name: 1,
          categories_id: 1,
          description: 1,
          image_url: 1,
        })
        .limit(6);
    } catch (err) {
      return err;
    }
  }

  filterRecipe(query: any) {
    try {
      return this.recipeModel
        .find({ collection_id: query.name })
        .select({ _id: 1, name: 1, categories_id: 1, image_url: 1 })
        .skip(query.limit - 8)
        .limit(8);
    } catch (err) {
      return err;
    }
  }

  filterCateRecipe(query: any) {
    try {
      return this.recipeModel
        .find({ "categories_id.name": { $in: [query.name] } })
        .select({ _id: 1, name: 1, categories_id: 1, image_url: 1 })
        .skip(query.limit - 8)
        .limit(8);
    } catch (err) {
      return err;
    }
  }

  async createRecipe(recipe: CreateRecipesDto) {
    try {
      const collection = await this.collectionsModel
        .findOne({
          name: recipe.collection,
        })
        .select({ name: 1 });
      const category = await this.categoriesModel
        .find({
          name: recipe.categories,
        })
        .select({ name: 1 });
      const tool = await this.toolsModel
        .find({
          _id: recipe.tools,
        })
        .select({ name: 1, image_url: 1 });
      const result = await this.recipeModel.create({
        name: recipe.name,
        description: recipe.description,
        collection_id: collection.name,
        categories_id: category,
        tools_id: tool,
        how_to: recipe.how_to,
        ingredients: recipe.ingredients,
        alcohol: recipe.alcohol,
        image_url: recipe.image_url,
        video_url: recipe.video_url,
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async remove(recipe: any) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    try {
      const { image_url } = await this.findRecipe(recipe.id);
      const publicId = getPublicIdFromUrl(image_url);
      const destroiedImage = await this.cloudinary.deleteImage(publicId);

      return (
        destroiedImage.result == "ok" &&
        (await this.recipeModel.deleteOne({ _id: recipe.id }))
      );
    } catch (err) {
      return err;
    }
  }

  async findRecipeTools(name: string) {
    try {
      return this.recipeModel.find({ "tools_id.name": { $in: [name] } });
    } catch (err) {
      return err;
    }
  }

  async updateRecipe(data: any) {
    const tool = await this.toolsModel
      .find({
        _id: data.body.tools,
      })
      .select({ name: 1, image_url: 1 });
    const category = await this.categoriesModel
      .find({
        name: data.body.categories,
      })
      .select({ name: 1 });

    return await this.recipeModel.updateOne(
      { _id: data.id },
      {
        $set: {
          name: data.body.name,
          description: data.body.description,
          collection_id: data.body.collection,
          categories_id: category,
          tools_id: tool,
          how_to: data.body.how_to,
          ingredients: data.body.ingredients,
          alcohol: data.body.alcohol,
          image_url: data.image_url,
          video_url: data.body.video_url,
        },
      }
    );
  }
}
