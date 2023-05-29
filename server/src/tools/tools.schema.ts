import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tool {
  @Prop()
  name: string;
  @Prop()
  image_url: string;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
