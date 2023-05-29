/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CollectionType,
  CreateCategoryType,
  ToolsType,
} from "../../util/Types";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function CanvasEditButton({
  recipe,
  collections,
  categories,
  tools,
}: any) {
  const [ingredient, setIngredient] = useState<string[]>(recipe.ingredients);
  const [filteredCategory, setFilteredCategory] = useState<
    CreateCategoryType[]
  >([]);
  const [currentCollection, setCurrentCollection] = useState<any>(
    recipe.collection_id
  );
  const [how, setHow] = useState<string[]>(recipe.how_to);
  const [check, setCheck] = useState<boolean>(recipe.alcohol);
  const [file, setFile] = useState<any | null>(recipe.image_url);
  const idOfTools = recipe.tools_id.map((one: { _id: string }) => one._id);
  const [selectTools, setSelectTools] = useState<string[]>(idOfTools);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spinner, setSpinner] = useState<string>("");
  const tempRef: MutableRefObject<string> = useRef("");
  const tempRefHow: MutableRefObject<string> = useRef("");
  const inputRefIng = useRef<HTMLInputElement>(null);
  const inputRefIns = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const addInputHandler = () => {
    tempRef.current && setIngredient([...ingredient, tempRef.current]);
    if (inputRefIng.current) {
      inputRefIng.current.value = "";
    }
  };

  const addInputHandlerHow = () => {
    tempRefHow.current && setHow([...how, tempRefHow.current]);
    if (inputRefIns.current) {
      inputRefIns.current.value = "";
    }
  };

  const removeInputHandler = (index: number) => {
    const deleteInput = ingredient.filter((input, i) => index !== i);
    setIngredient(deleteInput);
  };

  const removeInputHandlerHow = (index: number) => {
    const deleteInputHow = how.filter((input, i) => index !== i);
    setHow(deleteInputHow);
  };

  function addToolHandler(id: string) {
    selectTools.includes(id);
    if (selectTools.includes(id)) {
      setSelectTools(selectTools.filter((tool) => tool !== id));
    } else {
      setSelectTools([...selectTools, id]);
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  async function updateRecipe(e: any) {
    e.preventDefault();
    setSpinner("loading");
    const token = Cookies.get("token");

    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
      categories: e.target.category.value,
      collection: e.target.collection.value,
      ingredients: ingredient,
      how_to: how,
      video_url: e.target.videoUrl.value,
      alcohol: e.target.alcohol.checked,
      tools: selectTools,
    };

    const formData = new FormData();
    e.target.imageUrl.files[0]
      ? formData.append("file", file)
      : formData.append("img", file);
    formData.append("data", JSON.stringify(data));
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/update?id=${recipe._id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (result.data.modifiedCount > 0) {
      setSpinner("run");
      onClose();
      router.reload();
    }
  }

  useEffect(() => {
    const result = categories.filter(
      (category: any) => category.collection_name === currentCollection
    );

    setFilteredCategory(result);
  }, [categories, currentCollection]);

  return (
    <>
      <FiEdit
        onClick={onOpen}
        className="text-green-500 text-bold h-[20px] w-[20px] cursor-pointer"
      />

      <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="teal">
            Edit recipe
          </DrawerHeader>
          <DrawerBody padding="16px 36px">
            <form
              onSubmit={(e) => {
                updateRecipe(e);
              }}
            >
              <Stack spacing={"24px"} paddingBottom={"24px"}>
                <Box>
                  <FormLabel>Cocktail name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    defaultValue={recipe.name}
                    className="bg-slate-400 w-52 rounded"
                  />
                </Box>

                <Box>
                  <FormLabel className="block">Description</FormLabel>
                  <Textarea
                    name="description"
                    defaultValue={recipe.description}
                    className="resize  bg-slate-400  w-52 rounded"
                  />
                </Box>
                <Box>
                  <FormLabel className="block">Collection</FormLabel>
                  <Select
                    defaultValue={recipe.collection_id}
                    className="border"
                    name="collection"
                    onChange={(e) => setCurrentCollection(e.target.value)}
                  >
                    {collections.map(
                      (collection: CollectionType, index: number) => (
                        <option key={index}>{collection.name}</option>
                      )
                    )}
                  </Select>
                </Box>

                <Box>
                  <FormLabel className="block">Category</FormLabel>
                  <Select
                    defaultValue={recipe.categories_id[0]?.name}
                    name="category"
                  >
                    {filteredCategory.map((category: any, index: number) => (
                      <option key={index}>{category.name}</option>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <FormLabel className="block">Tools</FormLabel>
                  <div className="flex flex-wrap gap-1 w-4/4 mt-[25px] border-b-[1px] border-black pb-[20px]">
                    {tools.map((tool: ToolsType, index: number) => (
                      <div
                        className={
                          selectTools.includes(tool._id)
                            ? "w-[170px] py-[10px] border-[1px] border-teal-500 cursor-pointer flex flex-col items-center"
                            : "w-[170px] py-[10px] border-[0.5px] border-[#dadada] flex flex-col cursor-pointer items-center"
                        }
                        key={index}
                        onClick={() => addToolHandler(tool._id)}
                      >
                        <p className="">{tool.name}</p>
                        <Image
                          className="drop-shadow-2xl"
                          priority={true}
                          alt="tool image"
                          src={tool.image_url}
                          height={80}
                          width={80}
                        />
                      </div>
                    ))}
                  </div>
                </Box>
                <Box>
                  <div className="mt-[20px] mb-[20px] border-b-[1px] border-black pb-[20px]">
                    <FormLabel className="block">Ingredients</FormLabel>
                    <div className="flex flex-col gap-2 pt-[20px] pb-[20px]">
                      {ingredient.map((inex, index) => (
                        <Box
                          key={`input-container-${index}`}
                          className="h-full  items-center"
                        >
                          <Textarea
                            disabled={true}
                            value={inex}
                            style={{
                              color: "black",
                              minHeight: "40px",
                              marginBottom: "5px",
                            }}
                          />
                          <Input
                            value="Remove"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              marginBottom: "10px",
                            }}
                            onClick={() => {
                              removeInputHandler(index);
                            }}
                            type="button"
                          />
                        </Box>
                      ))}
                    </div>

                    <Input
                      id="adding"
                      type="text"
                      ref={inputRefIng}
                      name="ingredients"
                      className="bg-slate-400 w-52"
                      onChange={(e) => {
                        tempRef.current = e.target.value;
                      }}
                    />
                    <Input
                      value="Add ingredient"
                      style={{
                        color: "white",
                        backgroundColor: `${"green"}`,
                        marginTop: "5px",
                        border: "none",
                      }}
                      onClick={addInputHandler}
                      type="button"
                    />
                  </div>
                </Box>
                <Box>
                  <div className="mt-[20px] mb-[20px] border-b-[1px] border-black pb-[20px]">
                    <FormLabel className="block">Instructions</FormLabel>
                    <div className="flex flex-col gap-2 pt-[20px] pb-[20px]">
                      {how.map((inex, index) => (
                        <Box
                          key={`input-container-${index}`}
                          className="h-full  items-center"
                        >
                          <Textarea
                            disabled={true}
                            value={inex}
                            style={{
                              color: "black",
                              minHeight: "40px",
                              marginBottom: "5px",
                            }}
                          />
                          <Input
                            value="Remove"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              marginBottom: "10px",
                            }}
                            onClick={() => {
                              removeInputHandlerHow(index);
                            }}
                            type="button"
                          />
                        </Box>
                      ))}
                    </div>

                    <Input
                      id="adding"
                      type="text"
                      ref={inputRefIns}
                      name="instructions"
                      className="bg-slate-400 w-52"
                      onChange={(e) => {
                        tempRefHow.current = e.target.value;
                      }}
                    />
                    <Input
                      value="Add instructions"
                      style={{
                        color: "white",
                        backgroundColor: `${"green"}`,
                        marginTop: "5px",
                        border: "none",
                      }}
                      onClick={addInputHandlerHow}
                      type="button"
                    />
                  </div>
                </Box>

                <Box>
                  <FormLabel className="block">Photo or image</FormLabel>
                  <div className="flex">
                    <input
                      accept="image/*"
                      onChange={handleFileChange}
                      type="file"
                      name="imageUrl"
                      className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    />
                    {file && (
                      <div>
                        <Image
                          width={50}
                          height={50}
                          src={file}
                          alt="new image"
                        />
                      </div>
                    )}
                  </div>
                </Box>
                <Box>
                  <FormLabel className="block">Tutorial video</FormLabel>
                  <Input
                    defaultValue={recipe.video_url}
                    type="text"
                    name="videoUrl"
                  />
                </Box>
                <Box>
                  <FormLabel>Alcoholic or nonalcoholic</FormLabel>
                  <Checkbox
                    onClick={() => {
                      setCheck(!check);
                    }}
                    defaultChecked={check}
                    name="alcohol"
                    colorScheme="green"
                  />
                </Box>
              </Stack>
              <DrawerFooter borderTopWidth="1px">
                <input
                  className="w-[90px] p-2 me-4 rounded-md border"
                  onClick={onClose}
                  type="button"
                  value="Cancel"
                />

                <Button
                  type="submit"
                  colorScheme="teal"
                  leftIcon={
                    spinner == "loading" ? <Spinner size="xs" /> : <></>
                  }
                >
                  Save changes
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
