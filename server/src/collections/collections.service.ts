import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collection } from "../collections/collection.schema";
import { CreateCollectionsDto } from "./collections.create.dto";

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>
  ) {}

  allCollection() {
    return this.collectionModel.find();
  }
  async length() {
    const data = await this.collectionModel.find();
    return data.length;
  }

  createCollection(collection: CreateCollectionsDto) {
    return this.collectionModel.create(collection);
  }
}
