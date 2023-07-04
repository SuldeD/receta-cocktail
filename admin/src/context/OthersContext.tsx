import { createContext, useContext, useEffect, useState } from "react";
import {
  CategoryType,
  NewsType,
  OthersContextType,
  PropType,
  ToolsType,
} from "../util/Types";
import { useRouter } from "next/router";

const othersContext = createContext<OthersContextType>({} as OthersContextType);
export const useOthers = () => useContext(othersContext);

export default function OthersProvider({ children }: PropType) {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string | null>("");
  const [news, setNews] = useState<NewsType[]>([]);
  const [tools, setTools] = useState<ToolsType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    router.pathname == "/"
      ? setActivePage("dashboard")
      : setActivePage(`${router.pathname.slice(1)}`);
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
