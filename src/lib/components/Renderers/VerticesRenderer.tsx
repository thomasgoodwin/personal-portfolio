import * as THREE from 'three';
import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
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
  const hoverColorRef = useRef(new THREE.Color(hoverColor));
  const normalColorRef = useRef(new THREE.Color(normalColor));
  const obj = useLoader(OBJLoader, url);
  const pointsRef = useRef<THREE.Points>(null);
  const highlightedSet = useRef<Set<number>>(new Set());
  const needsRecalc = useRef(true);
  const tmpColor = useRef(new THREE.Color());

  useEffect(() => {
    hoverColorRef.current.set(hoverColor!);
  }, [hoverColor]);

  useEffect(() => {
    normalColorRef.current.set(normalColor!);
  }, [normalColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      needsRecalc.current = true;
    }, shiftInterval);

    return () => clearInterval(interval);
  }, [shiftInterval]);

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
    if (!points) return;

    const colorArr = (geometry.getAttribute("color") as THREE.BufferAttribute).array as Float32Array;
    const vertexCount = colorArr.length / 3;

    points.rotation.x += rotation[0] * .01;
    points.rotation.y += rotation[1] * .01;
    points.rotation.z += rotation[2] * .01;

    if (needsRecalc.current) {
      const highlightCount = Math.floor(vertexCount * vertexFlickerPercentage);
      highlightedSet.current.clear();
      for (let i = 0; i < highlightCount; i++) {
        highlightedSet.current.add(Math.floor(Math.random() * vertexCount));
      }
      needsRecalc.current = false;
    }

    const normal = normalColorRef.current;
    const hover = hoverColorRef.current;
    const highlighted = highlightedSet.current;
    const tmp = tmpColor.current;
    const speed = fadeSpeed;

    for (let i = 0; i < vertexCount; i++) {
      const idx = i * 3;
      const target = highlighted.has(i) ? hover : normal;
      tmp.setRGB(
        THREE.MathUtils.lerp(colorArr[idx], target.r, speed),
        THREE.MathUtils.lerp(colorArr[idx + 1], target.g, speed),
        THREE.MathUtils.lerp(colorArr[idx + 2], target.b, speed)
      );
      colorArr[idx] = tmp.r;
      colorArr[idx + 1] = tmp.g;
      colorArr[idx + 2] = tmp.b;
    }
    (geometry.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry}>
    <pointsMaterial size={pointSize} vertexColors />
  </points>
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
  return <Canvas camera={camera} style={{ height: height ?? 700 }}>
    <ambientLight intensity={1} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Suspense fallback={null}>
      {children}
    </Suspense>
  </Canvas>
}