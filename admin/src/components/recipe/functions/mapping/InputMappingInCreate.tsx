import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
// import { bottom } from "@popperjs/core";
import AddInputButton from "../sub/AddInputButton";
import RemoveButton from "../sub/RemoveInputButton";

interface ItemProps {
  item: string[];
  setItem: React.Dispatch<React.SetStateAction<string[]>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const InputMapping: React.FC<ItemProps> = ({
  item,
  setItem,
  inputText,
  setInputText,
}) => (
  <>
    {item.map((single, index) => (
      <Box key={`input-container-${index}`} className="h-full  items-center">
        <Textarea
          disabled={true}
          value={single}
          style={{ color: "black", minHeight: "40px", marginBottom: "5px" }}
        />
        <RemoveButton ingredient={item} setIngredient={setItem} index={index} />
      </Box>
    ))}
    <AddInputButton
      text={inputText}
      name="Add Ingredient"
      setInput={setInputText}
      func={() => {
        setItem([...item, inputText]);
        setInputText("");
      }}
    />
  </>
);

export default InputMapping;
