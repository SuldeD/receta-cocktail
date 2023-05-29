import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoriesModule } from "./categories/categories.module";
import { CollectionModule } from "./collections/collections.module";
import { CommentModule } from "./comments/comments.module";
import { GoogleLoginModule } from "./google-login/google-login.module";
import { NewsModule } from "./news/news.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ToolsModule } from "./tools/tools.module";
import { UserModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://munkhsuld:Zxcvb%400801@cluster0.di9aqtq.mongodb.net/receta?retryWrites=true&w=majority"
    ),
    ConfigModule.forRoot(),
    UserModule,
    RecipesModule,
    GoogleLoginModule,
    CategoriesModule,
    CollectionModule,
    ToolsModule,
    CommentModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
