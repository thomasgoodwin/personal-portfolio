import React, { useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { useErrorBoundary } from 'use-error-boundary'

type Axis = 'x' | 'y' | 'z';

interface AnimateRotationProps {
  axis: Axis;
  factor?: number;
  inverse?: boolean
}

interface ModelProps {
  url: string;
  animateRotation?: AnimateRotationProps;
}

export const ObjModel = ({
  url,
  animateRotation
}: ModelProps) => {
  const obj = useLoader(OBJLoader, url) as THREE.Group;
  const ref = useRef<THREE.Group | null>(null);
  useFrame(({ clock }) => {
    if (animateRotation && ref.current) {
      const time = clock.getElapsedTime();
      ref.current.rotation[animateRotation.axis] = time * (animateRotation.factor ?? 1) * (animateRotation.inverse ? -1 : 1);
    }
  });

  return <primitive ref={ref} object={obj} />;
}

interface ObjViewerProps {
  children?: React.ReactElement<ModelProps, typeof ObjModel>;
  height?: number
}

export const ObjViewer = ({ children, height=700 }: ObjViewerProps) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return didCatch ? (
    <div style={{ color: "red" }}>{error.message}</div>
  ) : <ErrorBoundary>
    <Canvas camera={{ position: [0, 1, 3] }} style={{ height: height }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Suspense
        fallback={
          <Html center>
            <div style={{ color: "white" }}>Loading OBJ…</div>
          </Html>
        }
      >
        {children}
      </Suspense>
      <OrbitControls />
    </Canvas>
  </ErrorBoundary>
} 