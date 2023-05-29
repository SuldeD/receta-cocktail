import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import {
  Collection,
  CollectionSchema,
} from "src/collections/collection.schema";
import { CollectionController } from "./collections.controller";
import { CollectionService } from "./collections.service";

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
