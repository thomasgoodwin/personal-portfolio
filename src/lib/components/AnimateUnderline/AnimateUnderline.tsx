import React, { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import styles from "./AnimateUnderline.module.css";

interface AnimateUnderlineProps {
  children: React.ReactNode;
  hoverColor?: string;
  alignment?: string;
}

const AnimateUnderline: React.FC<AnimateUnderlineProps> = ({
  children,
  hoverColor = "#00d600ff",
  alignment = "left"
}) => {
  const [rendered, setRendered] = useState(false);
  const { colorMode } = useColorMode();
  const underlineColor = colorMode === "light" ? "black" : "white";
  useEffect(() => {
    setRendered(true);
  }, []);
  return <div style={{ display: "flex", justifyContent: alignment }}>
    <div
      className={styles.wrapper}
      style={{
        ["--hover-color" as any]: hoverColor,
        ["--underline-color" as any]: underlineColor
      }}
    >
      {children}
      <span
        className={`${styles.line} ${rendered ? styles.animate : ""}`}
      />
    </div>
  </div>
};

export default AnimateUnderline;