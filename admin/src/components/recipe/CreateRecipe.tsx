/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CollectionType,
  ToolsType,
  CreateCategoryType,
  CreateCocktailType,
} from "../../util/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCocktail } from "@/src/context/CocktailContext";
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
import AddToolHandler from "./functions/AddToolHandler";
import InputMappingInCreate from "./functions/mapping/InputMappingInCreate";
import Cookies from "js-cookie";

export default function CreateRecipe(props: {
  collections: CollectionType[];
  tools: ToolsType[];
}) {
  const { collections, tools } = props;
  const [categories, setCategories] = useState<CreateCategoryType[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [selectTools, setSelectTools] = useState<string[]>([]);
  const [how, setHow] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spinner, setSpinner] = useState<string>("");
  const { setRecipes, recipes } = useCocktail();

  const [inputIng, setInputIng] = useState<string>("");
  const [inputIns, setInputIns] = useState<string>("");

  function filterCate(name: string) {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/filter?name=${name}`
      )
      .then((res) => setCategories(res.data));
  }
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/filter?name=${
          localStorage.getItem("currentColloction")
            ? localStorage.getItem("currentColloction")
            : "Strong"
        }`
      )
      .then((res) => setCategories(res.data));
  }, []);

  async function createCocktail(e: any) {
    e.preventDefault();
    setSpinner("loading");
    const token = Cookies.get("token");

    const cocktailData: CreateCocktailType = {
      name: e.target.name.value,
      description: e.target.description.value,
      categories: e.target.category.value,
      collection: e.target.collection.value,
      ingredients: ingredient,
      how_to: how,
      video_url: e.target.videoUrl.value,
      alcohol: e.target.alcohol.value,
      tools: selectTools,
    };
    const data = new FormData();
    data.append("file", e.target.imageUrl.files[0]);
    data.append("newRecipe", JSON.stringify(cocktailData));

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/create`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (result.data.name === cocktailData.name) {
      setRecipes([...recipes, result.data]);
      setSpinner("run");
      onClose();
      setSelectTools([]);
    }
  }

  return (
    <>
      <Button
        style={{ background: "teal", border: "teal", color: "white" }}
        className="my-[20px]"
        onClick={onOpen}
      >
        Create recipe
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="teal">
            Create a new recipe
          </DrawerHeader>
          <DrawerBody padding="16px 36px">
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={(e) => createCocktail(e)}
            >
              <Stack spacing={"24px"} paddingBottom={"24px"}>
                <Box>
                  <FormLabel htmlFor="name">Cocktail name</FormLabel>
                  <Input name="name" placeholder="Please enter recipe name" />
                </Box>
                <Box>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Please enter recipe description"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="collection">Collection</FormLabel>
                  <Select
                    name="collection"
                    onChange={(e) => filterCate(e.target.value)}
                  >
                    {collections.map((collection, index) => (
                      <option key={index} value={collection.name}>
                        {collection.name}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel htmlFor="tools">Tools</FormLabel>
                  <div className="flex flex-wrap gap-[45px]">
                    <AddToolHandler
                      selectTools={selectTools}
                      setSelectTools={setSelectTools}
                      tools={tools}
                    />
                  </div>
                </Box>
                <Box>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select name="category">
                    {categories.map((category, index) => (
                      <option key={index}>{category.name}</option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
                  <InputMappingInCreate
                    item={ingredient}
                    setItem={setIngredient}
                    inputText={inputIng}
                    setInputText={setInputIng}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="ingredients">Step by step</FormLabel>
                  <InputMappingInCreate
                    item={how}
                    setItem={setHow}
                    inputText={inputIns}
                    setInputText={setInputIns}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="ingredients">Photo or image</FormLabel>
                  <input
                    type="file"
                    name="imageUrl"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="ingredients">Tutorial video</FormLabel>
                  <Input
                    name="videoUrl"
                    placeholder="Please enter recipe name"
                  />
                </Box>
                <Box>
                  <Checkbox
                    colorScheme="green"
                    name="alcohol"
                    onChange={() => setCheck(!check)}
                    value={`${check}`}
                  >
                    Alcohol
                  </Checkbox>
                </Box>
              </Stack>
              <DrawerFooter borderTopWidth="1px">
                <input
                  type="button"
                  onClick={onClose}
                  value="Cancel"
                  className="w-[90px] p-2 me-4 rounded-md border"
                />
                <Button
                  colorScheme="teal"
                  type="submit"
                  leftIcon={
                    spinner == "loading" ? <Spinner size="xs" /> : <></>
                  }
                >
                  Submit
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
