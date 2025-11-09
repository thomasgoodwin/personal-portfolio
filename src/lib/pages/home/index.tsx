import { ObjViewer, ObjModel } from '@/lib/components/Renderers/ObjRenderer';
import { VerticesViewer, VerticesModel } from '@/lib/components/Renderers/VerticesRenderer';
import "./styles.css";
import { useElementHeight } from '@/lib/layout/components/HeightProvider/HeightProvider';

const cameraPos = [
  3.2, 3.6, 3.2
];
const Home = () => {
  const { height } = useElementHeight();
  return <div style={{ position: "relative" }}>
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
          url="/assets/mountain.obj"
          normalColor="#000000"
          hoverColor="#00ff00"
          pointSize={.022}
          rotation={[0, .2, 0]}
          fadeSpeed={.01}
          vertexFlickerPercentage={.33}
          shiftInterval={2200}
        />
      </VerticesViewer>
    </div>
    <div className="home">
      test
    </div>
  </div>
};

export default Home;
