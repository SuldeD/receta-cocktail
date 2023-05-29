import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CheckRole } from "../role/role.decorator";
import { CheckRoleGuard } from "../role/role.guard";

@Controller("recipes")
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly cloudinary: CloudinaryService
  ) {}

  @Get("length")
  length() {
    return this.recipesService.length();
  }
  @Get("all")
  find() {
    return this.recipesService.allRecipe();
  }

  @Get("get")
  findRecipe(@Query("id") id: string) {
    return this.recipesService.findRecipe(id);
  }

  @Get("get-used-tool")
  getLength(@Query("name") name: string) {
    return this.recipesService.findRecipeTools(name);
  }

  @Get("get-ids")
  findId() {
    return this.recipesService.allId();
  }

  @Get("get-card")
  findCard() {
    return this.recipesService.cardRecipe();
  }

  @Get("filter")
  filter(@Query() query: object) {
    return this.recipesService.filterRecipe(query);
  }

  @Get("recommend")
  recommend() {
    return this.recipesService.recommend();
  }

  @Get("filter-category")
  filterCategory(@Query() query: any) {
    return this.recipesService.filterCateRecipe(query);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  async create(
    @Body() body: any,
    @UploadedFile()
    file: any
  ) {
    try {
      const response = await this.cloudinary.uploadImage(file);

      const data = await {
        ...JSON.parse(body.newRecipe),
        image_url: response?.secure_url,
      };
      return this.recipesService.createRecipe(data);
    } catch (e) {
      return e.message;
    }
  }

  @Patch("update")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  async update(
    @UploadedFile() file: any,
    @Query("id") id: string,
    @Body() body: any
  ) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    if (body.img) {
      const data = {
        image_url: body.img,
        body: JSON.parse(body.data),
        id: id,
      };
      return this.recipesService.updateRecipe(data);
    } else {
      const { image_url } = await this.findRecipe(id);
      const publicId = getPublicIdFromUrl(image_url);
      const destroiedImage = await this.cloudinary.deleteImage(publicId);
      const response =
        destroiedImage && (await this.cloudinary.uploadImage(file));
      const data = {
        image_url: response?.secure_url,
        body: JSON.parse(body.data),
        id: id,
      };
      return this.recipesService.updateRecipe(data);
    }
  }

  @Delete("delete")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  remove(@Query() recipe: string) {
    return this.recipesService.remove(recipe);
  }
}
