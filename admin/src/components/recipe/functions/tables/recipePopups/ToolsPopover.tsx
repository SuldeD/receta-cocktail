import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function ToolsPopover({ recipe }: any) {
  const tools = recipe.tools_id;
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button style={{ fontSize: "13px" }}>Tools</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="teal.600" borderColor="teal.600">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Tools
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody className="w-auto max-w-sm">
          <ul className="whitespace-normal p-0">
            {tools.map((one: any, index: number) => (
              <li key={index}>
                {index + 1}.{` `}
                {one.name}
              </li>
            ))}
          </ul>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
