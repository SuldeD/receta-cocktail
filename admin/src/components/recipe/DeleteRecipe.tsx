import { useCocktail } from "@/src/context/CocktailContext";
import { CocktailType } from "@/src/util/Types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteAlert({ recipe }: { recipe: CocktailType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { setRecipes, recipes } = useCocktail();

  async function deleteHandler() {
    const token = Cookies.get("token");
    const filterData = recipes.filter(
      (filterRecipe) => filterRecipe._id !== recipe._id
    );
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/delete?id=${recipe._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (result && result.data.deletedCount == 1) {
      setRecipes(filterData);
      successToast();
    }
  }

  const successToast = useToast({
    position: "top-right",
    title: "deleted",
    containerStyle: {
      width: "10%",
      maxWidth: "100%",
    },
    status: "success",
    duration: 2000,
    isClosable: true,
  });

  return (
    <>
      <MdDelete
        className="text-red-500 text-bold h-[22px] w-[22px] cursor-pointer "
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure?{" "}
              <span className="text-red-300 font-bold">{recipe.name}</span>{" "}
              delete
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose(), deleteHandler();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
