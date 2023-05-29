import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CheckRole } from "../role/role.decorator";
import { CheckRoleGuard } from "../role/role.guard";
import { UserService } from "./users.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("all")
  find() {
    return this.userService.allUser();
  }

  @Get("length")
  length() {
    return this.userService.length();
  }

  @Patch(":id")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  updateUser(@Param("id") _id: string, @Body() updateUserInput: any) {
    console.log(updateUserInput);

    try {
      return this.userService.updateUser(_id, updateUserInput);
    } catch (error) {
      return error.message;
    }
  }

  @Patch("admin/:id")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  updateAdmin(@Param("id") _id: string, @Body() updateUserInput: any) {
    try {
      return this.userService.updateAdmin(_id, updateUserInput);
    } catch (error) {
      return error.message;
    }
  }

  @Delete("delete")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  delete(@Query() user: any) {
    return this.userService.delete(user);
  }

  @Post("login")
  login(@Body() user: any) {
    try {
      return this.userService.loginUser(user);
    } catch (err) {
      return err;
    }
  }

  @Post("create")
  @UseGuards(CheckRoleGuard)
  @CheckRole("MODERATOR", "ADMIN")
  create(@Body() body: any) {
    return this.userService.createUser(body);
  }
}
