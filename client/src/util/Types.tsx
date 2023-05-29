export interface CollectionType {
  name: string;
  image_url: string;
}

interface tempType {
  _id: string;
  name: string;
}
export interface RecipesType {
  _id: string;
  name: string;
  description: string;
  collection: string;
  ingredients: string[];
  how_to: object[];
  video_url: string;
  image_url: string;
  categories_id: tempType[];
  tools_id: tempType[];
  alcohol: boolean;
}

export interface CategoriesType {
  _id: string;
  name: string;
  collection_id: { name: string };
}

export interface UsersType {
  email: string;
  password: string;
  name?: string;
  picture: string;
}

export interface CommentType {
  comment: string;
  writer: string;
  created_at: string;
  recipe_id: string;
}

export interface OthersContextType {
  categories: CategoriesType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>;
  activeCollectionBtn: string | null;
  setActiveCollectionBtn: React.Dispatch<React.SetStateAction<string | null>>;
  activePage: string | null;
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
  activeCategoryBtn: string | null;
  setActiveCategoryBtn: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface CocktailContextType {
  recipes: RecipesType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipesType[]>>;
}

export interface UserContextType {
  user: UsersType | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null | undefined>>;
}

export interface PropType {
  children: React.ReactNode;
}
export interface ToolType {
  name: string;
  image_url: string;
  _id: string;
}
export interface NewsType {
  _id: string;
  name: string;
  description: string;
  title: string;
  subTitle: string;
  image_url: string;
  category: string;
}
