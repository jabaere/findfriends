import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
export function Model({
  children,
  modelPath,
  positionY,
  positionX,
  positionZ,
  ref,
  scale,
  ...props
}) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { viewport,camera,mouse } = useThree();
  const sceneRef = useRef();
  const vec = new THREE.Vector3()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sceneRef.current.rotation.y = time / 25;
    camera.position.lerp(vec.set(mouse.x / 7, mouse.y * 2, 7.5), 0.02);
    camera.rotation.x=sceneRef.current.rotation.x * 9 - 0.3
    //camera.rotation.z=sceneRef.current.rotation.z * 2 - 0.8
    //camera.
    
  });

  return (
    <group
      position={[positionX, positionY, positionZ]}
      scale={viewport.width / scale}
      ref={sceneRef}
      {...props}
    >
      
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
   
      <mesh rotation={[0, 4, 0]}>
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </group>
  );
}
