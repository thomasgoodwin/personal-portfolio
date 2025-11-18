import type { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Footer } from './components/footer';
import { Meta } from './components/meta';
import { HeightProvider } from './components/HeightProvider/HeightProvider';
import "./styles.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <HeightProvider>
    <Box transition="0.5s ease-out" height="100vh">
      <Meta />
      <Flex flexDirection="column" paddingY={4} minHeight="100vh">
        <Box className="frame" flex="1" display="flex" flexDirection="column" overflow={"hidden"}>
          <Box as="main" flex="1">
            {children}
          </Box>
        </Box>
        <Footer />
      </Flex>
    </Box>
  </HeightProvider>
};
