import { Box } from "@chakra-ui/react";
import Navbar from "./navbar/navbar";
import { ReactNode } from "react";

interface NavbarLayoutProps {
  children: ReactNode; 
}

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <Box>
      <Navbar />
      <Box as="main">
        {children}
      </Box>
    </Box>
  );
};

export default NavbarLayout;
