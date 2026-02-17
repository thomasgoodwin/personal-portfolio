import { useState } from 'react';
import { ObjViewer, ObjModel } from '@/lib/components/Renderers/ObjRenderer';
import { VerticesViewer, VerticesModel } from '@/lib/components/Renderers/VerticesRenderer';
import { useElementHeight } from '@/lib/layout/components/HeightProvider/HeightProvider';
import AnimateUnderline from '@/lib/components/AnimateUnderline/AnimateUnderline';
import {
  ColorPicker,
  parseColor,
  Text,
  type ColorPickerValueChangeDetails,
} from "@chakra-ui/react"
import { Link } from '@tanstack/react-router';
import "./styles.css";
import { getCookie, setCookie } from '@/lib/services/storage';

const cameraPos = [
  3.2, 3.6, 3.2
];
const Home = () => {
  const { height } = useElementHeight();
  const [colorValue, setColorValue] = useState<string>(getCookie("website-primary") ?? "#00ff00");

  const handleValueChange = (details: ColorPickerValueChangeDetails) => {
    setColorValue(details.value.toString("hex"));
    setCookie("website-primary", details.value.toString("hex"));
  };

  return <div style={{ position: "relative" }}>
    <div style={{ padding: "1rem 1.5rem", zIndex: 10, position: "relative" }}>
      <ColorPicker.Root value={parseColor(colorValue)} onValueChange={handleValueChange}>
        <ColorPicker.HiddenInput />
        <ColorPicker.Label />
        <ColorPicker.Control>
          <ColorPicker.Trigger />
        </ColorPicker.Control>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <ColorPicker.EyeDropper />
            <ColorPicker.Sliders />
            <ColorPicker.SwatchGroup>
              <ColorPicker.SwatchTrigger value={colorValue}>
                <ColorPicker.Swatch value={colorValue} boxSize="6" />
              </ColorPicker.SwatchTrigger>
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </ColorPicker.Root>
    </div>
    {false && <ObjViewer>
      <ObjModel
        url="/assets/shark.obj"
        animateRotation={{ axis: "y", factor: .5, inverse: true }}
      />
    </ObjViewer>}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: "fit-content"
      }}
    >
      <VerticesViewer camera={{ position: cameraPos, fov: 65 }} height={height}>
        <VerticesModel
          url="/assets/mountain.bin"
          normalColor="#000000"
          hoverColor={colorValue.toString()}
          pointSize={.05}
          rotation={[0, .05, 0]}
          fadeSpeed={.01}
          vertexFlickerPercentage={.33}
          shiftInterval={2200}
        />
      </VerticesViewer>
    </div>
    <div className="home">
      <div className="home-title">
        <Text textStyle="h1" as="h1">Thomas Goodwin</Text>
        <Text textStyle="h2" as="p">Software Developer</Text>
      </div>
      <div className="home-nav">
        <div className="home-nav-links">
          <AnimateUnderline alignment='right' hoverColor={colorValue}>
            <Text textStyle="h1" as="h1">
              <Link to="/projects" from="/" style={{ position: 'relative', zIndex: 5, textTransform: "uppercase" }}>Projects</Link>
            </Text>
          </AnimateUnderline>
          <AnimateUnderline alignment='right' hoverColor={colorValue}>
            <Text textStyle="h2" as="h2">
              <a href="https://tomie.games/" style={{ position: 'relative', zIndex: 5, textTransform: "uppercase" }}>Games</a>
            </Text>
          </AnimateUnderline>
        </div>
      </div>
    </div>
  </div>
};

export default Home;
