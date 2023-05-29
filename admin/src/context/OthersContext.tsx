import { createContext, useContext, useEffect, useState } from "react";
import {
  CategoryType,
  NewsType,
  OthersContextType,
  PropType,
  ToolsType,
} from "../util/Types";

const othersContext = createContext<OthersContextType>({} as OthersContextType);
export const useOthers = () => useContext(othersContext);

export default function OthersProvider({ children }: PropType) {
  const [activePage, setActivePage] = useState<string | null>("");
  const [news, setNews] = useState<NewsType[]>([]);
  const [tools, setTools] = useState<ToolsType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    localStorage.getItem("page")
      ? setActivePage(localStorage.getItem("page"))
      : setActivePage("Dashboard");
  }, []);

  return (
    <othersContext.Provider
      value={{
        activePage,
        setActivePage,
        news,
        setNews,
        tools,
        setTools,
        categories,
        setCategories,
      }}
    >
      {children}
    </othersContext.Provider>
  );
}
