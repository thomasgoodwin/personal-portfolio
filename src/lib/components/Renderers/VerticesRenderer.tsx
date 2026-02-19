import * as THREE from 'three';
import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const vertexShader = `
  attribute float aPrevHighlight;
  attribute float aHighlight;
  uniform float uFadeProgress;
  uniform float uPointSize;
  uniform vec3 uNormalColor;
  uniform vec3 uHoverColor;
  varying vec3 vColor;

  void main() {
    float h = mix(aPrevHighlight, aHighlight, uFadeProgress);
    vColor = mix(uNormalColor, uHoverColor, h);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPointSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader =`
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

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
  pointSize = .05,
  vertexFlickerPercentage = 50,
  shiftInterval = 2000
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const fadeProgressRef = useRef(0);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uNormalColor: { value: new THREE.Color(normalColor) },
      uHoverColor: { value: new THREE.Color(hoverColor) },
      uFadeProgress: { value: 0 },
      uPointSize: { value: pointSize },
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(r => r.arrayBuffer())
      .then(buf => {
        if (cancelled) return;
        const positions = new Float32Array(buf);
        const vertexCount = positions.length / 3;
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.setAttribute('aPrevHighlight', new THREE.BufferAttribute(new Float32Array(vertexCount), 1));
        geom.setAttribute('aHighlight', new THREE.BufferAttribute(new Float32Array(vertexCount), 1));
        setGeometry(geom);
      });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => {
    material.uniforms.uHoverColor.value.set(hoverColor);
  }, [hoverColor, material]);

  useEffect(() => {
    material.uniforms.uNormalColor.value.set(normalColor);
  }, [normalColor, material]);

  useEffect(() => {
    if (!geometry) {
      return;
    }
    const recalc = () => {
      const prevAttr = geometry.getAttribute('aPrevHighlight') as THREE.BufferAttribute;
      const attr = geometry.getAttribute('aHighlight') as THREE.BufferAttribute;
      const prevArr = prevAttr.array as Float32Array;
      const arr = attr.array as Float32Array;
      const count = arr.length;

      prevArr.set(arr);
      prevAttr.needsUpdate = true;
      arr.fill(0);
      const highlightCount = Math.floor(count * vertexFlickerPercentage);
      for (let i = 0; i < highlightCount; i++) {
        arr[Math.floor(Math.random() * count)] = 1;
      }
      attr.needsUpdate = true;
      fadeProgressRef.current = 0;
    };
    recalc();
    const id = setInterval(recalc, shiftInterval);
    return () => clearInterval(id);
  }, [geometry, shiftInterval, vertexFlickerPercentage]);

  useFrame(() => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    points.rotation.x += rotation[0] * .01;
    points.rotation.y += rotation[1] * .01;
    points.rotation.z += rotation[2] * .01;

    fadeProgressRef.current += (1 - fadeProgressRef.current) * fadeSpeed;
    material.uniforms.uFadeProgress.value = fadeProgressRef.current;
  });

  if (!geometry) {
    return null;
  }

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
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
  return <Canvas camera={camera} style={{ height: height ?? 700 }}>
    <ambientLight intensity={1} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Suspense fallback={null}>
      {children}
    </Suspense>
  </Canvas>
}
