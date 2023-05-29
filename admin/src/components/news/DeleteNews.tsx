import { useOthers } from "@/src/context/OthersContext";
import { NewsType } from "@/src/util/Types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteAlert({ newsData }: { newsData: NewsType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const { setNews, news } = useOthers();

  function deleteHandler() {
    const filterData = news.filter(
      (filterNews) => filterNews._id !== newsData._id
    );

    axios
      .delete(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/news/delete?id=${newsData._id}`
      )
      .then((res) => res.statusText == "OK" && setNews(filterData));
  }

  return (
    <>
      <MdDelete
        className="text-red-500 text-bold h-[22px] w-[22px] cursor-pointer text-center"
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
              <span className="text-red-300 font-bold">{newsData.name}</span>{" "}
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
