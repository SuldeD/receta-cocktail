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

export default function IngPopover({ recipe }: any) {
  const ingredients = recipe.ingredients;
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button style={{ fontSize: "13px" }}>Ingredient</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="teal.600" borderColor="teal.600">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Ingredients
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody className="w-auto max-w-sm">
          <ul className="whitespace-normal p-0">
            {ingredients.map((one: any, index: number) => (
              <li key={index}>
                {index + 1}.{` `}
                {one}
              </li>
            ))}
          </ul>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
