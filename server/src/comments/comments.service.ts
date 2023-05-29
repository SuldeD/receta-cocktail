import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCommentsDto } from "./comments.create.dto";
import { Comment } from "./comments.schema";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}
  allComment() {
    try {
      return this.commentModel.find();
    } catch (err) {
      return err;
    }
  }

  findComment(id: string) {
    try {
      return this.commentModel.find({ recipe_id: id });
    } catch (err) {
      return err;
    }
  }

  createCollection(collection: CreateCommentsDto) {
    try {
      return this.commentModel.create(collection);
    } catch (err) {
      return err;
    }
  }
}
