import {
  CategoryType,
  CocktailType,
  CollectionType,
  ToolsType,
} from "../../../../util/Types";
import { TableContainer, Tbody, Th, Thead, Tr, Table } from "@chakra-ui/react";
import RecipeTableRow from "./RecipeTableRow";
import { useState } from "react";
import Pagination from "./Pagination";

interface RecipeTablePropType {
  categories: CategoryType[];
  collections: CollectionType[];
  tools: ToolsType[];
  sortedData: CocktailType[];
}

export default function RecipeTable({
  categories,
  collections,
  tools,
  sortedData,
}: RecipeTablePropType) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <TableContainer className="mt-[20px]">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th className="">Name</Th>
            <Th className="">Collection</Th>
            <Th className="">Category</Th>
            <Th className="">Image</Th>
            <Th className="">Alcoholic</Th>
            <Th className="">Instructions</Th>
            <Th className="">Recipes</Th>
            <Th className="">Tools</Th>
            <Th className="">Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((recipe: CocktailType) => (
            <RecipeTableRow
              categories={categories}
              tools={tools}
              collections={collections}
              recipe={recipe}
              key={recipe._id}
            />
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </TableContainer>
  );
}
