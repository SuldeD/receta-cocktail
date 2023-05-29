import { CocktailContextType, CocktailType, PropType } from "../util/Types";
import { useContext, createContext, useState } from "react";

const cocktailContext = createContext<CocktailContextType>(
  {} as CocktailContextType
);
export const useCocktail = () => useContext(cocktailContext);

export default function CocktailProvider({ children }: PropType) {
  const [recipes, setRecipes] = useState<CocktailType[]>([]);

  return (
    <cocktailContext.Provider value={{ setRecipes, recipes }}>
      {children}
    </cocktailContext.Provider>
  );
}
