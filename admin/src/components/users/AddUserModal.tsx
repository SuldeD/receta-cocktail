/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@/src/context/UserContext";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

interface AddUserModalType {
  title: string;
}

export default function AddUserModal({ title }: AddUserModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spinner, setSpinner] = useState<string>("");
  const { users, setUsers } = useUser();

  async function submitHandler(e: any) {
    e.preventDefault();
    setSpinner("loading");
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };
    const token = Cookies.get("token");

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result.data.name === data.name) {
      setUsers([...users, result.data]);
      setSpinner("run");
      onClose();
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        style={{ background: "teal", border: "teal", color: "white" }}
        className="my-[20px]"
      >
        Add User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={submitHandler}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select name="role">
                  <option value="CLIENT">CLIENT</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MODERATOR">MODERATOR</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                type="submit"
                leftIcon={spinner == "loading" ? <Spinner size="xs" /> : <></>}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
