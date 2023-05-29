import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateNewsDto } from "./news.create.dto";
import { News } from "./news.schema";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private NewsModel: Model<News>,
    private readonly cloudinary: CloudinaryService
  ) {}
  all() {
    return this.NewsModel.find();
  }

  findId(id: string) {
    return this.NewsModel.findOne({ _id: id });
  }

  async dataLength() {
    const data = await this.NewsModel.find();
    return data.length;
  }

  async create(data: CreateNewsDto, file: any) {
    try {
      const { secure_url } = await this.cloudinary.uploadImage(file);
      return await this.NewsModel.create({ ...data, image_url: secure_url });
    } catch (err) {
      return err;
    }
  }
  async delete(news: any) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    try {
      const { image_url } = await this.findId(news.id);
      const publicId = getPublicIdFromUrl(image_url);
      const destroiedImage = await this.cloudinary.deleteImage(publicId);
      return (
        destroiedImage.result == "ok" &&
        this.NewsModel.deleteOne({ _id: news.id })
      );
    } catch (err) {
      return err;
    }
  }
}
