import { useState } from "react";
import { Box, Flex, Grid, Text, List, Heading } from "@chakra-ui/react";
import { getCookie } from "@/lib/services/storage";
import { Link } from "@tanstack/react-router";
import AnimateUnderline from "@/lib/components/AnimateUnderline/AnimateUnderline";
import "./styles.css";

type ProjectEntry = {
  number: string;
  title: string;
  status: string;
  media: React.ReactNode;
  system: string;
  features: string[];
};

const MediaPlaceholder = ({ label, color }: { label: string; color: string }) => {
  return <Flex
    align="center"
    justify="center"
    direction="column"
    gap={2}
    height="100%"
    width="100%"
    color={color}
    opacity={0.4}
  >
    <Text fontSize="xs" letterSpacing="0.3em">[ NO SIGNAL ]</Text>
    <Text fontSize="2xs" letterSpacing="0.2em">{label}</Text>
  </Flex>
};

const ProjectCard = ({ entry, color }: { entry: ProjectEntry; color: string }) => {
  return <Box className="project-card" border="1px solid" borderColor="whiteAlpha.200">
    <Flex
      align="center"
      gap={5}
      px={5}
      py={3}
      borderBottom="1px solid"
      borderColor={color}
      color={color}
    >
      <Text fontSize="xs" letterSpacing="0.2em" opacity={0.5}>{entry.number}</Text>
      <Text flex={1} fontSize="sm" letterSpacing="0.3em">{entry.title}</Text>
      <Text fontSize="xs" letterSpacing="0.2em" opacity={0.6}>STATUS: {entry.status}</Text>
    </Flex>
    <Grid className="project-body" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
      <Box position="relative" aspectRatio={16 / 9} bg="black" overflow="hidden" borderRightWidth={{ base: 0, md: "1px" }} borderBottomWidth={{ base: "1px", md: 0 }} borderColor="whiteAlpha.100">
        <Box className="project-scanlines" position="absolute" inset={0} zIndex={2} pointerEvents="none" />
        {entry.media}
      </Box>
      <Flex direction="column" gap={5} p={5}>
        <Box borderLeft="2px solid" borderColor={color} pl={3}>
          <Text fontSize="xs" letterSpacing="0.3em" color={color} mb={1}>SYSTEM</Text>
          <Text fontSize="xs" lineHeight={1.7} opacity={0.75}>
            {entry.system}
          </Text>
        </Box>
        <Box borderLeft="2px solid" borderColor={color} pl={3}>
          <Text fontSize="xs" letterSpacing="0.3em" color={color} mb={1}>FEATURES</Text>
          <List.Root listStyle="none" p={0} m={0} fontSize="xs" lineHeight={1.9} opacity={0.75}>
            {entry.features.map((feature) => <List.Item key={feature}>— {feature}</List.Item>)}
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
};

const Projects = () => {
  const [color] = useState<string>(getCookie("website-primary") ?? "#00ff00");

  const entries: ProjectEntry[] = [
    {
      number: "01",
      title: "2D SIDESCROLLER ENGINE",
      status: "COMPLETE",
      media: (
        <iframe
          src="https://www.youtube.com/embed/SlqdfiQxpH4"
          title="2D Sidescroller Engine Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", display: "block", filter: "sepia(0.15) brightness(0.95)" }}
        />
      ),
      system: "Custom C++ 2D game engine built from the ground up.",
      features: [
        "Custom ECS with modular managers (Graphics, Physics, Events)",
        "Animated sprite system with cycling/one-shot clips via UV-mapped spritesheet shader",
        "Event-driven input binding and dispatch",
        "Enemy AI with walk, attack, and damage behaviors",
        "FMOD audio integration",
      ],
    },
    {
      number: "02",
      title: "COMMUNAL KARAOKE QUEUE",
      status: "COMPLETE",
      media: <MediaPlaceholder label="Karaoke Queue Screenshot" color={color} />,
      system: "Real-time shared karaoke queue app: React frontend, Express/SQLite backend, synced live over Socket.IO.",
      features: [
        "Room-based queues behind a shareable link and QR code, so guests add songs from their own phones",
        "Live sync across every connected device: adds, removals, reorders, and admin handoff all broadcast instantly",
        "Drag-and-drop queue reordering, with an admin YouTube player that advances to the next track automatically",
        "Searchable directory of scraped karaoke videos, deduped across channels re-uploading the same song, plus a popularity-weighted \"surprise me\" picker",
        "Manual title fallback for region-blocked videos, and an offline demo mode when no backend is reachable",
      ],
    },
    {
      number: "03",
      title: "MEDIEVAL FANTASY VILLAGE SIM",
      status: "COMPLETE",
      media: <MediaPlaceholder label="Village Sim Screenshot" color={color} />,
      system: "Turn-based medieval village economy sim rendered as hand-drawn SVG stick figures in React.",
      features: [
        "Season-by-season simulation of farmsteads: crop rotation across grain, feed, and cash crops, livestock, pantries, and savings, with income setting each family's social status",
        "Seasonal policy levers: tax rate, militia drilling (safety at the cost of harvest yield), trade caravans (profit at the risk of robbery), and retinue recruitment for defense",
        "Buildable village projects, mill, smokehouse, mine, and ward stones, each rendered on the village map once built",
        "Randomized seasonal events, bandit raids, disease, ore strikes, traveling healers, logged in a running \"Village Chronicle\"",
        "Hover tooltips throughout surfacing per-villager pantry, livestock, and flavor text",
      ],
    },
  ];

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
    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} alignItems="start">
      {entries.map((entry) => <ProjectCard key={entry.number} entry={entry} color={color} />)}
    </Grid>
  </Box>
};

export default Projects;
