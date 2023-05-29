import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CheckRole } from "src/role/role.decorator";
import { CheckRoleGuard } from "src/role/role.guard";
import { ToolsService } from "./tools.service";
@Controller("tools")
export class ToolsController {
  constructor(private readonly toolService: ToolsService) {}

  @Get("get")
  find() {
    return this.toolService.all();
  }

  @Get("length")
  length() {
    return this.toolService.length();
  }

  @Get("find")
  findTool(@Query("id") id: string) {
    return this.toolService.findId(id);
  }

  @Get("get-ids")
  getIds() {
    return this.toolService.getIds();
  }

  @Post("create")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  @UseInterceptors(FileInterceptor("file"))
  create(@UploadedFile() file: any, @Body() body: any) {
    try {
      const data = {
        ...JSON.parse(body.newTool),
      };
      return this.toolService.create(data, file);
    } catch (err) {
      return err;
    }
  }
  @Delete("delete")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  remove(@Query() id: string) {
    return this.toolService.remove(id);
  }
}
