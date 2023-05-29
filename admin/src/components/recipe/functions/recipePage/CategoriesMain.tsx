import { useState } from "react";
import { CategoryType, CollectionType } from "@/src/util/Types";
import {
  Input,
  InputGroup,
  InputLeftElement,
  TabPanel,
} from "@chakra-ui/react";
import CreateCategory from "@/src/components/category/CreateCategory";
import CategoriesTable from "../tables/CategoriesTable";
import { RiSearch2Line } from "react-icons/ri";

interface RecipePropType {
  categories: CategoryType[];
  collections: CollectionType[];
}

export default function CategoriesMain({
  collections,
  categories,
}: RecipePropType): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSort(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredData = categories.filter((one: { name: string }) =>
    one.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return (
    <TabPanel className="">
      <div className="w-full flex justify-between items-center">
        <CreateCategory collections={collections} />
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
      <CategoriesTable sortedData={sortedData} />
    </TabPanel>
  );
}
