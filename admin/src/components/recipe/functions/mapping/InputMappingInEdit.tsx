import { MutableRefObject, RefObject } from "react";

interface ItemProps {
  ingredient: string[];
  setIngredient: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefIng: RefObject<HTMLInputElement>;
  tempRef: MutableRefObject<string>;
}

const InputMappingInEdit: React.FC<ItemProps> = ({
  ingredient,
  setIngredient,
  tempRef,
  inputRefIng,
}) => {
  const addInputHandler = () => {
    tempRef.current && setIngredient([...ingredient, tempRef.current]);
    if (inputRefIng.current) {
      inputRefIng.current.value = "";
    }
  };

  const removeInputHandler = (index: number) => {
    const deleteInput = ingredient.filter((input, i) => index !== i);
    setIngredient(deleteInput);
  };

  return (
    <div className="flex flex-col gap-2 pt-4 pb-4">
      {ingredient.map((ingredient, index) => (
        <div key={index} className="h-full flex items-center">
          <p className="w-52 m-0 bg-gray-400 p-2">{ingredient}</p>
          <button
            className="px-2 bg-red-500 text-white"
            onClick={() => removeInputHandler(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          id="adding"
          type="text"
          ref={inputRefIng}
          name="ingredients"
          className="bg-slate-400 w-52 p-2"
        />
        <button
          className="px-2 bg-green-400 text-white"
          onClick={addInputHandler}
        >
          Add ingredient
        </button>
      </div>
    </div>
  );
};

export default InputMappingInEdit;
