/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionType } from "../../util/Types";
import axios from "axios";
import { useState } from "react";
import { useOthers } from "../../context/OthersContext";
import { Spinner } from "@chakra-ui/spinner";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  DrawerFooter,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Stack } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import Cookies from "js-cookie";

export default function CreateCategory(props: {
  collections: CollectionType[];
}) {
  const { collections } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setCategories, categories } = useOthers();
  const [spinner, setSpinner] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createCateHandler(e: any): Promise<void> {
    e.preventDefault();
    setSpinner("loading");
    const token = Cookies.get("token");
    const category = {
      collection: e.target.collection.value,
      name: e.target.name.value,
    };

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/categories/create`,
      {
        ...category,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (result.data.name === category.name) {
      setCategories([...categories, result.data]);
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
        Create category
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              className="flex flex-col w-full"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={(e: any) => createCateHandler(e)}
            >
              <Stack spacing="16px">
                <Box>
                  <FormLabel htmlFor="name">Collection</FormLabel>
                  <Select name="collection">
                    {collections.map((collection, index) => (
                      <option key={index} value={collection.name}>
                        {collection.name}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <FormLabel htmlFor="name">Category name</FormLabel>
                  <Input name="name" placeholder="Please enter category name" />
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
