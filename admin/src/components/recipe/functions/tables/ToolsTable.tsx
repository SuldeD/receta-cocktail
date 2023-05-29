import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Delete from "../../../tool/DeleteTool";
import { ToolsType } from "@/src/util/Types";
import Image from "next/image";

export default function ToolsTable({
  sortedData,
}: {
  sortedData: ToolsType[];
}) {
  return (
    <>
      <TableContainer className="mt-[20px]">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>ID</Th>
              <Th>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData
              .map((tool: ToolsType, index: number) => (
                <Tr key={index}>
                  <Td>{tool.name}</Td>
                  <Td>
                    <Image
                      className="drop-shadow-2xl"
                      priority={true}
                      width={80}
                      height={200}
                      src={tool.image_url}
                      alt="tool image"
                    />
                  </Td>
                  <Td>{tool._id}</Td>
                  <Td className="text-center ps-4">
                    <Delete tool={tool} />
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
