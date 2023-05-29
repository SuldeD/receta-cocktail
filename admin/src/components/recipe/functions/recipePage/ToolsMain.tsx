import { useState } from "react";
import { ToolsType } from "@/src/util/Types";
import {
  Input,
  InputGroup,
  InputLeftElement,
  TabPanel,
} from "@chakra-ui/react";
import CreateTools from "@/src/components/tool/CreateTool";
import ToolsTable from "../tables/ToolsTable";
import { RiSearch2Line } from "react-icons/ri";

interface ToolsPropType {
  tools: ToolsType[];
}

export default function ToolsMain({ tools }: ToolsPropType): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSort(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredData = tools.filter((one: { name: string }) =>
    one.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return (
    <TabPanel className="">
      <div className="w-full flex justify-between items-center">
        <CreateTools />
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
      <ToolsTable sortedData={sortedData} />
    </TabPanel>
  );
}
