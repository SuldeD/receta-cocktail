/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <>
      <input
        id="adding"
        type="text"
        value={text}
        name="ingredients"
        className="bg-slate-400 w-52"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <input
        value={name}
        disabled={!text}
        className={`px-[10px] ${text ? "bg-green-400" : "bg-gray-400"}`}
        onClick={func}
        type="button"
      />
    </>
  );
}
