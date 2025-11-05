import { Flex, Link, Text } from '@chakra-ui/react';
 import { FaLinkedin } from 'react-icons/fa';
 
export const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        <Link
          href="https://www.linkedin.com/in/thomas-g-goodwin/"
          target="_blank"
          rel="noopener noreferrer"
        >
           <FaLinkedin /> LinkedIn
        </Link>
      </Text>
    </Flex>
  );
};
