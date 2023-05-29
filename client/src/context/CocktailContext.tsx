import { CocktailContextType, PropType, RecipesType } from "../util/Types";
import React from "react";
import { useContext, createContext, useState } from "react";

const cocktailContext = createContext<CocktailContextType>(
  {} as CocktailContextType
);
export const useCocktail = () => useContext(cocktailContext);

export default function CocktailProvider({ children }: PropType) {
  const [recipes, setRecipes] = useState<RecipesType[]>([]);

  return (
    <cocktailContext.Provider value={{ setRecipes, recipes }}>
      {children}
    </cocktailContext.Provider>
  );
}
