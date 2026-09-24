import {
  ColorPicker,
  type ColorPickerValueChangeDetails,
  parseColor,
  Text,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { useRef, useState } from 'react';

import AnimateUnderline from '@/lib/components/AnimateUnderline/AnimateUnderline';
import { ObjModel, ObjViewer } from '@/lib/components/Renderers/ObjRenderer';
import {
  VerticesModel,
  VerticesViewer,
} from '@/lib/components/Renderers/VerticesRenderer';
import VHS from '@/lib/components/VHS/VHS';
import { useElementHeight } from '@/lib/layout/components/HeightProvider/HeightProvider';
import './styles.css';

import { getCookie, setCookie } from '@/lib/services/storage';

const cameraPos = [3.2, 3.6, 3.2];
const Home = () => {
  const { height } = useElementHeight();
  const rootRef = useRef<HTMLDivElement>(null);
  const [colorValue, setColorValue] = useState<string>(
    getCookie('website-primary') ?? '#00ff00',
  );

  const handleValueChange = (details: ColorPickerValueChangeDetails) => {
    setColorValue(details.value.toString('hex'));
    setCookie('website-primary', details.value.toString('hex'));
  };

  return (
    <VHS
      rootRef={rootRef}
      style={{ width: '100%', height: '100%' }}
      backdrop={
        <VerticesViewer
          camera={{ position: cameraPos, fov: 65 }}
          height={height}
          eventSource={rootRef}
        >
          <VerticesModel
            url="/assets/mountain.bin"
            normalColor="#000000"
            hoverColor={colorValue.toString()}
            pointSize={0.05}
            rotation={[0, 0.05, 0]}
            fadeSpeed={0.01}
            vertexFlickerPercentage={0.33}
            shiftInterval={2200}
          />
        </VerticesViewer>
      }
    >
      <div style={{ padding: '1rem 1.5rem', zIndex: 10, position: 'relative' }}>
        <ColorPicker.Root
          value={parseColor(colorValue)}
          onValueChange={handleValueChange}
        >
          <ColorPicker.HiddenInput />
          <ColorPicker.Label />
          <ColorPicker.Control>
            <ColorPicker.Trigger />
          </ColorPicker.Control>
          <ColorPicker.Positioner>
            <ColorPicker.Content>
              <ColorPicker.Area />
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
              <ColorPicker.SwatchGroup>
                <ColorPicker.SwatchTrigger value={colorValue}>
                  <ColorPicker.Swatch value={colorValue} boxSize="6" />
                </ColorPicker.SwatchTrigger>
              </ColorPicker.SwatchGroup>
            </ColorPicker.Content>
          </ColorPicker.Positioner>
        </ColorPicker.Root>
      </div>
      {false && (
        <ObjViewer>
          <ObjModel
            url="/assets/shark.obj"
            animateRotation={{ axis: 'y', factor: 0.5, inverse: true }}
          />
        </ObjViewer>
      )}
      <div className="home">
        <div className="home-title">
          <Text textStyle="h1" as="h1">
            Thomas Goodwin
          </Text>
          <Text textStyle="h2" as="p" ml={8}>
            Software Developer
          </Text>
        </div>
        <div className="home-nav">
          <div className="home-nav-links">
            <AnimateUnderline alignment="right" hoverColor={colorValue}>
              <Text textStyle="h1" as="h1">
                <Link
                  to="/projects"
                  from="/"
                  style={{
                    position: 'relative',
                    zIndex: 5,
                    textTransform: 'uppercase',
                  }}
                >
                  Projects
                </Link>
              </Text>
            </AnimateUnderline>
            <AnimateUnderline alignment="right" hoverColor={colorValue}>
              <Text textStyle="h2" as="h2">
                <a
                  href="https://tomie.games/"
                  style={{
                    position: 'relative',
                    zIndex: 5,
                    textTransform: 'uppercase',
                  }}
                >
                  Games
                </a>
              </Text>
            </AnimateUnderline>
          </div>
        </div>
      </div>
    </VHS>
  );
};

export default Home;
