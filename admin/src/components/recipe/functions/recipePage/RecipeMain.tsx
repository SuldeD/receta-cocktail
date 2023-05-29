import { useState } from "react";
import RecipeTable from "../tables/RecipeTable";
import { CategoryType, CollectionType, ToolsType } from "@/src/util/Types";
import CreateRecipe from "../../CreateRecipe";
import {
  Input,
  InputGroup,
  InputLeftElement,
  TabPanel,
} from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import { useCocktail } from "@/src/context/CocktailContext";

interface CategoriesPropType {
  categories: CategoryType[];
  tools: ToolsType[];
  collections: CollectionType[];
}

export default function RecipeMain({
  collections,
  categories,
  tools,
}: CategoriesPropType): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const { recipes } = useCocktail();

  function handleSort(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  }

  const filteredData = recipes.filter((one: { name: string }) =>
    one.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return (
    <TabPanel className="">
      <div className="w-full flex justify-between items-center">
        <CreateRecipe collections={collections} tools={tools} />

        <InputGroup maxWidth={"650px"}>
          <InputLeftElement pointerEvents="none">
            <RiSearch2Line className="w-[20px] h-[20px] text-gray-300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search by name"
            onChange={handleSort}
          />
        </InputGroup>
      </div>
      <RecipeTable
        sortedData={sortedData}
        categories={categories}
        collections={collections}
        tools={tools}
      />
    </TabPanel>
  );
}
