import axios from "axios";
import Layout from "../components/Layout";
import RecipeColGraphic from "../components/dashboard/RecipeColGraphic";
import AllData from "../components/dashboard/AllData";
import { CocktailType } from "../util/Types";

interface RecipePropType {
  categoriesLength: number;
  collectionsLength: number;
  recipesLength: number;
  toolsLength: number;
  usersLength: number;
  newsLength: number;
  recipesData: CocktailType[];
}

export default function Dashboard({
  categoriesLength,
  collectionsLength,
  recipesLength,
  toolsLength,
  usersLength,
  newsLength,
  recipesData,
}: RecipePropType): JSX.Element {
  return (
    <Layout>
      <div className="w-full flex flex-col items-center gap-5">
        <AllData
          recipes={recipesLength}
          categories={categoriesLength}
          collections={collectionsLength}
          tools={toolsLength}
          users={usersLength}
          news={newsLength}
        />
        <RecipeColGraphic recipes={recipesData} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const usersLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/length`)
    .then((res) => res.data);

  const newsLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/news/length`)
    .then((res) => res.data);

  const recipesLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/length`)
    .then((res) => res.data);

  const recipesData = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/all`)
    .then((res) => res.data);

  const categoriesLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/length`)
    .then((res) => res.data);

  const collectionsLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/collections/length`)
    .then((res) => res.data);

  const toolsLength = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/length`)
    .then((res) => res.data);

  return {
    props: {
      toolsLength,
      collectionsLength,
      categoriesLength,
      recipesLength,
      newsLength,
      usersLength,
      recipesData,
    },
  };
}
