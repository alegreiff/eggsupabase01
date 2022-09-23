import NextLink from "next/link";
import {
  Avatar,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAppContext } from "../utils/context/AppContext";

const UserMenu = () => {
  const { _cu: currentUser, _sp: supabase } = useAppContext();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <HStack>
      <Button onClick={handleLogout}> Salir </Button>
      <NextLink href="/jefe" passHref>
        <Link>Jefe</Link>
      </NextLink>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </MenuButton>
        <MenuList>
          <span> {currentUser?.correo} </span>
          <MenuItem>
            {/* <Button onClick={handleLogout}> Salir </Button> */}
          </MenuItem>
          <MenuItem>
            <NextLink href="/perfil/yo" passHref>
              <Link>Perfil</Link>
            </NextLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>Link 3</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default UserMenu;

/* 

*/
