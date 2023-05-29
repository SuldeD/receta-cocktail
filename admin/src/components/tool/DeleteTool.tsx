import { useOthers } from "@/src/context/OthersContext";
import { ToolsType } from "@/src/util/Types";
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

export default function DeleteAlert({
  tool,
}: {
  tool: ToolsType;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { setTools, tools } = useOthers();
  const token = Cookies.get("token");

  async function deleteHandler() {
    const filterData = tools.filter(
      (filterTool) => filterTool._id !== tool._id
    );

    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/delete?id=${tool._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("tools res", result);

    if (result.data.deletedCount == 1) {
      setTools(filterData);
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
              <span className="text-red-300 font-bold">{tool.name}</span> delete
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
