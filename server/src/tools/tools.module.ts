import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { Tool, ToolSchema } from "src/tools/tools.schema";
import { ToolsController } from "./tools.controller";
import { ToolsService } from "./tools.service";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tool.name, schema: ToolSchema }]),
    CloudinaryModule,
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
