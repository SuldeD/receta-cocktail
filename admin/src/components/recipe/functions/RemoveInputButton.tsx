import { Input } from "@chakra-ui/input";
import React from "react";

interface IngredientProps {
  ingredient: string[];
  setIngredient: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

const RemoveButton: React.FC<IngredientProps> = ({
  index,
  ingredient,
  setIngredient,
}) => {
  const removeInputHandler = (index: number) => {
    const deleteInput = ingredient.filter((input, i) => index !== i);
    setIngredient(deleteInput);
  };

  return (
    <Input
      value="Remove"
      onClick={() => {
        removeInputHandler(index);
      }}
      type="button"
    />
  );
};

export default RemoveButton;
