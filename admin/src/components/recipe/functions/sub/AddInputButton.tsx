/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";

export default function AddInputButton({
  text,
  func,
  name,
  setInput,
}: {
  name: string;
  text: string;
  func: any;
  setInput: any;
}) {
  return (
    <div>
      <Textarea
        id="adding"
        value={text}
        name="ingredients"
        style={{ minHeight: "40px", marginTop: "15px" }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Input
        value={name}
        disabled={!text}
        style={{
          color: "white",
          backgroundColor: `${text ? "green" : "gray"}`,
          marginTop: "5px",
        }}
        onClick={func}
        type="button"
      />
    </div>
  );
}
