import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Tool } from "src/tools/tools.schema";

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Tool.name) private ToolModel: Model<Tool>,
    private readonly cloudinary: CloudinaryService
  ) {}
  all() {
    return this.ToolModel.find();
  }

  findId(id: string) {
    return this.ToolModel.findOne({ _id: id });
  }

  async length() {
    const data = await this.ToolModel.find();
    return data.length;
  }

  getIds() {
    return this.ToolModel.find().select({ _id: 1 });
  }

  async create(data: any, file: any) {
    try {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      return await this.ToolModel.create({ ...data, image_url: secure_url });
    } catch (err) {
      return err;
    }
  }

  async remove(tool: any) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    try {
      const { image_url } = await this.findId(tool.id);
      const publicId = getPublicIdFromUrl(image_url);
      const destroiedImage = await this.cloudinary.deleteImage(publicId);
      return (
        destroiedImage.result == "ok" &&
        (await this.ToolModel.deleteOne({ _id: tool.id }))
      );
    } catch (err) {
      return err;
    }
  }
}
