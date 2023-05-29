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

export default function DescPopover({ recipe }: any) {
  const description = recipe.description;
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button style={{ fontSize: "13px" }}>Description</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="teal.600" borderColor="teal.600">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Description
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody className="w-auto max-w-sm">
          <div className="whitespace-normal p-0">{description}</div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
