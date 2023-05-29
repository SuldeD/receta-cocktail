/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOthers } from "@/context/OthersContext";
import { RecipesType } from "@/util/Types";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function RecipeCard(props: {
  recipe: RecipesType;
}): JSX.Element {
  const { recipe } = props;
  const router = useRouter();

  const { setActivePage } = useOthers();
  return (
    <div
      className={`relative w-[256px] cursor-pointer recipe mb-5`}
      onClick={() => {
        router.push(`../cocktail/${recipe._id}`);
        localStorage.setItem("page", "");
        setActivePage("");
      }}
    >
      <Image
        src={recipe.image_url}
        className="recipeCard-img"
        width={1000}
        height={1000}
        alt={`${recipe.name} image`}
      />

      <div className="mt-3">
        {" "}
        <p className="recipeCard-title">{recipe.categories_id[0]?.name}</p>
        <p className="recipeCard-text">{recipe.name}</p>
      </div>
    </div>
  );
}
