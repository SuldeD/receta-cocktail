import { useCocktail } from "@/context/CocktailContext";
import { useOthers } from "@/context/OthersContext";
import { CategoriesType } from "@/util/Types";
import axios from "axios";
import { useEffect } from "react";
import CategoryBtn from "./CategoryBtn";

export default function Categories(): JSX.Element {
  const {
    activeCollectionBtn,
    categories,
    setActiveCategoryBtn,
    setCategories,
  } = useOthers();

  const { setRecipes } = useCocktail();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/filter?name=${activeCollectionBtn}&limit=8`
      )
      .then((res) => setRecipes(res.data));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/filter?name=${activeCollectionBtn}`
      )
      .then((res) => setCategories(res.data));

    setActiveCategoryBtn("");
  }, [activeCollectionBtn]);

  return (
    <>
      <div className="Container flex flex-wrap place-content-center py-[48px] gap-5 border-x-[0.5px] border-[#dadada]">
        {categories.map((category: CategoriesType, index) => (
          <CategoryBtn key={index} category={category.name} />
        ))}
      </div>
    </>
  );
}
