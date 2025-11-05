import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Meta } from './components/meta';
import "./styles.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <Box transition="0.5s ease-out" minHeight="100vh">
    <Meta />
    <Flex flexDirection="column" padding={12} minHeight="100vh">
      <Box className="frame" flex="1" display="flex" flexDirection="column">
        <Header />
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Box>
    </Flex>
  </Box>
};
