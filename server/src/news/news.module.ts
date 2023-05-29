import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { NewsController } from "./news.controller";
import { News, newsSchema } from "./news.schema";
import { NewsService } from "./news.service";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: newsSchema }]),
    CloudinaryModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
