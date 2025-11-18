import { createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = createSystem(defaultConfig, {
  theme: {
    textStyles: {
      h1: {
        value: {
          fontSize: "4rem",
          fontWeight: "700",
          lineHeight: "1.1",
        },
      },
      h2: {
        value: {
          fontSize: "2.5rem",
          fontWeight: "600",
          lineHeight: "1.2",
        },
      },
      h3: {
        value: {
          fontSize: "2rem",
          fontWeight: "600",
          lineHeight: "1.3",
        },
      },
    },
    tokens: {
      fonts: {
        heading: { value: 'Stack Sans Notch, sans-serif' },
        body: { value: 'Stack Sans Notch, sans-serif' },
      },
    },
  },
});
