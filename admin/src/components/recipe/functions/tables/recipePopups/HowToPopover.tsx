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

export default function HowToPopover({ recipe }: any) {
  const how_to = recipe.how_to;
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button style={{ fontSize: "13px" }}>How to</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="teal.600" borderColor="teal.600">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Instructions
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody className="w-auto max-w-sm">
          <ul className="whitespace-normal p-0">
            {how_to.map((step: any, index: number) => (
              <li key={index}>
                {index + 1}.{` `}
                {step}
              </li>
            ))}
          </ul>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
