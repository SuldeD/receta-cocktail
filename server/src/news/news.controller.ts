import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CheckRole } from "../role/role.decorator";
import { NewsService } from "./news.service";
@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get("all")
  find() {
    return this.newsService.all();
  }

  @Get("length")
  length() {
    return this.newsService.dataLength();
  }
  @Get("find")
  findTool(@Query("id") id: string) {
    return this.newsService.findId(id);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  create(@UploadedFile() file: any, @Body() body: any) {
    const data = {
      ...JSON.parse(body.newData),
    };
    return this.newsService.create(data, file);
  }

  @Delete("delete")
  @CheckRole("MODERATOR", "ADMIN")
  delete(@Query() id: string) {
    return this.newsService.delete(id);
  }
}
