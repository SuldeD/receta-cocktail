import { CategoriesType, PropType, OthersContextType } from "../util/Types";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const productContext = createContext<OthersContextType>(
  {} as OthersContextType
);
export const useOthers = () => useContext(productContext);

export default function ProductProvider({ children }: PropType) {
  const [activeCollectionBtn, setActiveCollectionBtn] = useState<string | null>(
    "Difficulty"
  );
  const [activePage, setActivePage] = useState<string | null>("");
  const [activeCategoryBtn, setActiveCategoryBtn] = useState<string | null>("");

  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    localStorage.getItem("page")
      ? setActivePage(localStorage.getItem("page"))
      : setActivePage("cocktails");

    localStorage.getItem("category") &&
      setActiveCategoryBtn(localStorage.getItem("category"));

    localStorage.getItem("currentCollection")
      ? setActiveCollectionBtn(localStorage.getItem("currentCollection"))
      : setActiveCollectionBtn("Difficulty");
  }, []);

  return (
    <productContext.Provider
      value={{
        activeCollectionBtn,
        setActiveCollectionBtn,
        activePage,
        setActivePage,
        categories,
        setCategories,
        activeCategoryBtn,
        setActiveCategoryBtn,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
