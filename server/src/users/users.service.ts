import { Injectable, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}
  allUser() {
    return this.userModel.find();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  createUser(user: any) {
    return this.userModel.create({
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }

  async length() {
    const data = await this.userModel.find();
    return data.length;
  }

  async loginUser(user: any) {
    try {
      const findAdmin = await this.userModel.findOne({
        email: user.email,
        password: user.password,
        role: "ADMIN",
      });
      const payload = {
        _id: findAdmin._id,
        name: findAdmin.name,
        email: findAdmin.email,
        role: findAdmin.role,
        password: findAdmin.password,
      };
      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (err) {
      return err;
    }
  }

  async delete(user: any) {
    try {
      return this.userModel.deleteOne({
        _id: user.id,
      });
    } catch (err) {
      return err;
    }
  }
  async updateUser(_id: string, user: any) {
    return await this.userModel.findOneAndUpdate({ _id }, user);
  }

  async updateAdmin(_id: string, user: any) {
    const updatedAdmin = await this.userModel.findOneAndUpdate({ _id }, user);
    const payload = {
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      password: user.password,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
