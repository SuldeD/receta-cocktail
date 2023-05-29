export class CreateRecipesDto {
  name: string;
  description: string;
  collection: string;
  ingredients: object[];
  how_to: object[];
  video_url: string;
  image_url: string;
  categories: string[];
  tools: string[];
  alcohol: boolean;
}
