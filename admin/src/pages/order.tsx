import { List, ListIcon, ListItem } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { MdCheck } from "react-icons/md";

export default function Moderator(): JSX.Element {
  return (
    <Layout>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheck} color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheck} color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheck} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        {/* You can also use custom icons from react-icons */}
        <ListItem>
          <ListIcon as={MdCheck} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Layout>
  );
}
