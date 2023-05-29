/* eslint-disable @typescript-eslint/no-misused-promises */
import { useOthers } from "@/src/context/OthersContext";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Stack } from "@chakra-ui/layout";
import {
  DrawerFooter,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

export default function CreateTools() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spinner, setSpinner] = useState<string>();
  const { tools, setTools } = useOthers();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createToolHandler(e: any) {
    setSpinner("loading");
    e.preventDefault();
    const token = Cookies.get("token");
    const tool = {
      name: e.target.name.value,
    };

    const data = new FormData();
    data.append("file", e.target.image.files[0]);
    data.append("newTool", JSON.stringify(tool));

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/create`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("tool res", result);

    if (result.data.name === tool.name) {
      setTools([...tools, result.data]);
      setSpinner("run");
      onClose();
    }
  }

  return (
    <>
      <Button
        className="my-[20px]"
        style={{ background: "teal", border: "teal", color: "white" }}
        onClick={onOpen}
      >
        Create tool
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="flex flex-col" onSubmit={createToolHandler}>
              <Stack spacing="16px">
                <Box>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input name="name" placeholder="Please enter tool name" />
                </Box>
                <Box>
                  <input
                    type="file"
                    name="image"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                  />
                </Box>

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
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
