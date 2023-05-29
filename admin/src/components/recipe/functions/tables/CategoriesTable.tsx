import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DeleteAlert from "@/src/components/category/DeleteCategory";
import { CategoryType } from "@/src/util/Types";

export default function CategoriesTable({
  sortedData,
}: {
  sortedData: CategoryType[];
}) {
  return (
    <>
      <TableContainer className="mt-[20px]">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Collection</Th>
              <Th>ID</Th>
              <Th>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData
              .map((categ: CategoryType, index: number) => (
                <Tr key={index}>
                  <Td>{categ.name}</Td>
                  <Td>{categ.collection_name}</Td>
                  <Td>{categ._id}</Td>
                  <Td className="text-center">
                    <DeleteAlert category={categ} />
                  </Td>
                </Tr>
              ))
              .reverse()}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
