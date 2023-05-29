/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateNewsType } from "../../util/Types";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  Textarea,
  DrawerFooter,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useOthers } from "@/src/context/OthersContext";

export default function CreateNews(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spinner, setSpinner] = useState<string>("");
  const { news, setNews } = useOthers();

  function CreateNewsHandler(e: any) {
    e.preventDefault();
    setSpinner("loading");
    const newsData: CreateNewsType = {
      name: e.target.name.value,
      description: e.target.desc.value,
      category: e.target.cate.value,
      title: e.target.title.value,
      subTitle: e.target.subTitle.value,
    };
    const data = new FormData();
    data.append("file", e.target.image.files[0]);
    data.append("newData", JSON.stringify(newsData));
    axios
      .post(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/news/create`, data)
      .then(
        (res) =>
          res.data &&
          (setNews([...news, res.data]), setSpinner("run"), onClose())
      );
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Create
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent padding="16px">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="teal">
            Create a new news
          </DrawerHeader>

          <form onSubmit={CreateNewsHandler}>
            <DrawerBody>
              <Stack spacing="16px">
                <Box>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input name="name" placeholder="Please enter news name" />
                </Box>
                <Box>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input name="title" placeholder="Please enter news title" />
                </Box>
                <Box>
                  <FormLabel htmlFor="cate">Category</FormLabel>
                  <Input name="cate" placeholder="Please enter news category" />
                </Box>
                <Box>
                  <FormLabel htmlFor="subTitle">Sub title</FormLabel>
                  <Textarea name="subTitle" />
                </Box>
                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea name="desc" />
                </Box>
                <Box>
                  <input
                    type="file"
                    name="image"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                  />
                </Box>
              </Stack>
            </DrawerBody>
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
                leftIcon={spinner == "loading" ? <Spinner size="xs" /> : <></>}
              >
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
