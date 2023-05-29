import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CheckRole } from "../role/role.decorator";
import { CheckRoleGuard } from "../role/role.guard";
import { CategoriesService } from "./categories.service";
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("get")
  find() {
    return this.categoriesService.all();
  }

  @Get("length")
  length() {
    return this.categoriesService.length();
  }

  @Get("filter")
  filterRecipe(@Query("name") name: string) {
    return this.categoriesService.filterCategory(name);
  }

  @Post("create")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  create(@Body() body: any) {
    console.log(body);

    return this.categoriesService.create(body);
  }

  @Delete("delete")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  delete(@Query() cate: any) {
    return this.categoriesService.delete(cate);
  }
}
