import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "../categories/category.schema";
import { Collection, CollectionSchema } from "../collections/collection.schema";
import { CheckRoleGuard } from "../role/role.guard";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
