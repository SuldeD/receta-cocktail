import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CheckRole } from "../role/role.decorator";
import { CollectionService } from "./collections.service";

@Controller("collections")
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly cloudinary: CloudinaryService
  ) {}

  @Get("get")
  async find() {
    return this.collectionService.allCollection();
  }

  @Get("length")
  async length() {
    return this.collectionService.length();
  }

  @Post("create")
  @CheckRole("MODERATOR", "ADMIN")
  @UseInterceptors(FileInterceptor("file"))
  async create(@Body() body: any, @UploadedFile() file: any) {
    const image_url = await this.cloudinary.uploadImage(file);
    return this.collectionService.createCollection({
      ...JSON.parse(body.newCol),
      image_url: image_url.secure_url,
    });
  }
}
