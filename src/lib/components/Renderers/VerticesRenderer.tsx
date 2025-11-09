import * as THREE from 'three';
import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";

interface VerticesModelProps {
  url: string;
  rotation?: [number, number, number];
  hoverColor?: string;
  normalColor?: string;
  fadeSpeed?: number;
  pointSize?: number;
  vertexFlickerPercentage?: number;
  shiftInterval?: number;
}

export const VerticesModel: React.FC<VerticesModelProps> = ({
  url,
  rotation = [0, .25, 0],
  hoverColor,
  normalColor,
  fadeSpeed = .025,
  pointSize = .03,
  vertexFlickerPercentage = 50,
  shiftInterval = 2000
}) => {
  const hoverColorThree = new THREE.Color(hoverColor);
  const normalColorThree = new THREE.Color(normalColor);
  const obj = useLoader(OBJLoader, url);
  const pointsRef = useRef<THREE.Points>(null);
  const [calculateHighlightedPoints, setCalculateHighlightedPoints] = useState(true);
  const [highlightedPoints, setHighlightedPoints] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculateHighlightedPoints(true);
    }, shiftInterval);

    return () => clearInterval(interval);
  }, []);

  const geometry = useMemo(() => {
    const merged = new THREE.BufferGeometry();
    const positions: number[] = [];

    obj.traverse((child: any) => {
      if ((child as THREE.Mesh).isMesh) {
        const geom = (child as THREE.Mesh).geometry as THREE.BufferGeometry;
        const pos = geom.getAttribute('position');
        for (let i = 0; i < pos.count; i++) {
          positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        }
      }
    });

    merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const colors = new Float32Array(positions.length);
    const color = new THREE.Color(normalColor);
    for (let i = 0; i < positions.length / 3; i++) {
      color.toArray(colors, i * 3);
    }
    merged.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return merged;
  }, [obj]);

  useFrame(() => {
    const points = pointsRef.current;
    if (!points) {
      return
    };

    const positions = geometry.getAttribute("position");
    const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;

    points.rotation.x += rotation[0] * .01;
    points.rotation.y += rotation[1] * .01;
    points.rotation.z += rotation[2] * .01;
    const tmpColor = new THREE.Color();

    if (calculateHighlightedPoints) {
      const highlightCount = Math.floor(positions.count * vertexFlickerPercentage);
      const newHighlightedPoints = new Array(highlightCount).fill(0).map(() => Math.floor(Math.random() * positions.count));
      setHighlightedPoints(newHighlightedPoints);
      setCalculateHighlightedPoints(false);
    }
    for (let i = 0; i < positions.count; i++) {
      const target = normalColorThree;
      tmpColor.setRGB(
        THREE.MathUtils.lerp(colorAttr.getX(i), target.r, fadeSpeed),
        THREE.MathUtils.lerp(colorAttr.getY(i), target.g, fadeSpeed),
        THREE.MathUtils.lerp(colorAttr.getZ(i), target.b, fadeSpeed)
      );
      colorAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
    }
    for (let i = 0; i < highlightedPoints.length; i++) {
      const target = hoverColorThree;
      tmpColor.setRGB(
        THREE.MathUtils.lerp(colorAttr.getX(highlightedPoints[i]), target.r, fadeSpeed),
        THREE.MathUtils.lerp(colorAttr.getY(highlightedPoints[i]), target.g, fadeSpeed),
        THREE.MathUtils.lerp(colorAttr.getZ(highlightedPoints[i]), target.b, fadeSpeed)
      );
      colorAttr.setXYZ(highlightedPoints[i], tmpColor.r, tmpColor.g, tmpColor.b);
    }
    colorAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={pointSize} vertexColors />
    </points>
  );
};

interface VerticesViewerProps {
  children?: React.ReactElement<VerticesModelProps, typeof VerticesModel>;
  camera?: object;
  height?: number | null
}

export const VerticesViewer = ({
  camera = { position: [0, 1, -3], fov: 60 },
  height,
  children
}: VerticesViewerProps) => {
  console.log(height)
  return (
    <Canvas camera={camera} style={{ height: height ?? 700 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
}