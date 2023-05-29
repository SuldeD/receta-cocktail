import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import {
  CategoryType,
  CocktailType,
  CollectionType,
  ToolsType,
} from "../util/Types";
import { useEffect } from "react";
import { useCocktail } from "../context/CocktailContext";
import { useOthers } from "../context/OthersContext";
import axios from "axios";
import Layout from "../components/Layout";
import RecipeMain from "../components/recipe/functions/recipePage/RecipeMain";
import CategoriesMain from "../components/recipe/functions/recipePage/CategoriesMain";
import ToolsMain from "../components/recipe/functions/recipePage/ToolsMain";

interface RecipePropType {
  categoriesData: CategoryType[];
  collections: CollectionType[];
  recipes: CocktailType[];
  toolsData: ToolsType[];
}

export default function Recipe({
  categoriesData,
  collections,
  recipes,
  toolsData,
}: RecipePropType): JSX.Element {
  const { setRecipes } = useCocktail();
  const { setTools, tools, setCategories, categories } = useOthers();
  const recipeReversed = recipes.reverse();
  useEffect(() => {
    setRecipes(recipeReversed);
    setTools(toolsData);
    setCategories(categoriesData);
  }, [
    categoriesData,
    recipeReversed,
    recipes,
    setCategories,
    setRecipes,
    setTools,
    toolsData,
  ]);
  return (
    <Layout>
      <div className="mt-[40px]">
        <Tabs>
          <TabList className="mb-[20px] border-none" style={{ border: "none" }}>
            <Tab style={{ color: "teal" }}>Recipes</Tab>
            <Tab style={{ color: "teal" }}>Categories</Tab>
            <Tab style={{ color: "teal" }}>Tools</Tab>
          </TabList>

          <TabPanels className="border rounded-md ps-[20px]">
            <RecipeMain
              collections={collections}
              categories={categoriesData}
              tools={tools}
            />
            <CategoriesMain categories={categories} collections={collections} />
            <ToolsMain tools={tools} />
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categoriesData = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/get`)
    .then((res) => res.data);

  const collections = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/collections/get`)
    .then((res) => res.data);

  const toolsData = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/get`)
    .then((res) => res.data);

  const recipes = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/all`)
    .then((res) => res.data);

  return {
    props: {
      categoriesData,
      collections,
      recipes,
      toolsData,
    },
  };
}
