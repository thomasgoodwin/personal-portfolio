import { useState } from "react";
import { Box, Flex, Grid, Text, List, Heading } from "@chakra-ui/react";
import { getCookie } from "@/lib/services/storage";
import { Link } from "@tanstack/react-router";
import AnimateUnderline from "@/lib/components/AnimateUnderline/AnimateUnderline";
import "./styles.css";

const Projects = () => {
  const [color] = useState<string>(getCookie("website-primary") ?? "#00ff00");

  return <Box className="projects-container" fontFamily="monospace">
    <Flex mb={10} display="flex" justifyContent="space-between">
      <Heading fontSize="lg" letterSpacing="0.25em" color={color} opacity={0.75} display={"flex"}>
        <Box aria-hidden="true">//</Box>&nbsp;PROJECT LOG&nbsp;<Box ria-hidden="true">//</Box>
      </Heading>
      <AnimateUnderline alignment='right' hoverColor={color}>
        <Text textStyle="h2" as="h2" fontSize="2xl" letterSpacing="0.25em" opacity={0.75} >
          <Link to="/" from="/" style={{ position: 'relative', zIndex: 5, textTransform: "uppercase" }}>Home</Link>
        </Text>
      </AnimateUnderline>
    </Flex>
    <Box className="project-card" border="1px solid" borderColor="whiteAlpha.200" maxW="900px">
      <Flex
        align="center"
        gap={5}
        px={5}
        py={3}
        borderBottom="1px solid"
        borderColor={color}
        color={color}
      >
        <Text fontSize="xs" letterSpacing="0.2em" opacity={0.5}>01</Text>
        <Text flex={1} fontSize="sm" letterSpacing="0.3em">2D SIDESCROLLER ENGINE</Text>
        <Text fontSize="xs" letterSpacing="0.2em" opacity={0.6}>STATUS: COMPLETE</Text>
      </Flex>
      <Grid className="project-body" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
        <Box position="relative" aspectRatio={16 / 9} bg="black" overflow="hidden" borderRightWidth={{ base: 0, md: "1px" }} borderBottomWidth={{ base: "1px", md: 0 }} borderColor="whiteAlpha.100">
          <Box className="project-scanlines" position="absolute" inset={0} zIndex={2} pointerEvents="none" />
          <iframe
            src="https://www.youtube.com/embed/SlqdfiQxpH4"
            title="2D Sidescroller Engine Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block", filter: "sepia(0.15) brightness(0.95)" }}
          />
        </Box>
        <Flex direction="column" gap={5} p={5}>
          <Box borderLeft="2px solid" borderColor={color} pl={3}>
            <Text fontSize="xs" letterSpacing="0.3em" color={color} mb={1}>SYSTEM</Text>
            <Text fontSize="xs" lineHeight={1.7} opacity={0.75}>
              Custom C++ 2D game engine built from the ground up.
            </Text>
          </Box>
          <Box borderLeft="2px solid" borderColor={color} pl={3}>
            <Text fontSize="xs" letterSpacing="0.3em" color={color} mb={1}>FEATURES</Text>
            <List.Root listStyle="none" p={0} m={0} fontSize="xs" lineHeight={1.9} opacity={0.75}>
              <List.Item>— Custom ECS with modular managers (Graphics, Physics, Events)</List.Item>
              <List.Item>— Animated sprite system with cycling/one-shot clips via UV-mapped spritesheet shader</List.Item>
              <List.Item>— Event-driven input binding and dispatch</List.Item>
              <List.Item>— Enemy AI with walk, attack, and damage behaviors</List.Item>
              <List.Item>— FMOD audio integration</List.Item>
            </List.Root>
          </Box>
        </Flex>
      </Grid>
      <Flex align="center" gap={3} px={5} py={2} borderTop="1px solid" borderColor="whiteAlpha.100" color={color} opacity={0.5}>
        <Box flex={1} h="1px" bg={color} opacity={0.4} />
        <Text fontSize="xs" letterSpacing="0.3em">END OF RECORD</Text>
        <Box flex={1} h="1px" bg={color} opacity={0.4} />
      </Flex>
    </Box>
  </Box>
};

export default Projects;
