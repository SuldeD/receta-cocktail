import { useCocktail } from "@/context/CocktailContext";
import { useOthers } from "@/context/OthersContext";
import axios from "axios";
import { useEffect } from "react";

export default function CategoryBtn(props: { category: string }): JSX.Element {
  const { setActiveCategoryBtn, activeCategoryBtn } = useOthers();
  const { setRecipes } = useCocktail();

  const categoryBtn =
    "p-[5px] px-[20px] rounded-[25px] font-light border border-1 border-black";

  useEffect(() => {
    if (activeCategoryBtn == props.category) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/filter-category?name=${activeCategoryBtn}&limit=8`
        )
        .then((res) => setRecipes(res.data));
    }
  }, [activeCategoryBtn]);

  return (
    <button
      onClick={() => {
        setActiveCategoryBtn(props.category);
        localStorage.setItem("category", props.category);
      }}
      className={
        props.category == activeCategoryBtn
          ? `${categoryBtn} text-white bg-black `
          : `${categoryBtn} text-black`
      }
    >
      {props.category}
    </button>
  );
}
