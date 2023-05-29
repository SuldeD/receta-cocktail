import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateCommentsDto } from "./comments.create.dto";
import { CommentsService } from "./comments.service";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get("get")
  findAll() {
    return this.commentService.allComment();
  }

  @Get("find")
  findOne(@Query("id") id: string) {
    return this.commentService.findComment(id);
  }

  @Post("create")
  create(@Body() body: CreateCommentsDto) {
    return this.commentService.createCollection(body);
  }
}
