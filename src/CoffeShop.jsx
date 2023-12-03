import React, { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { RefContext } from './context/context'
import {EffectComposer, DepthOfField, Bloom, Noise, Vignette} from '@react-three/postprocessing';

function Sound({ url }) {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    sound.current.play()

    // Set the reference distance for reducing volume
    sound.current.setMaxDistance(50);

    // Set the rolloff factor to control volume reduction with distance
    sound.current.setRolloffFactor(10); // You can adjust this value based on your preference

    // Set the distance model to control volume reduction algorithm
    sound.current.setDistanceModel("linear"); // You can experiment with "linear", "inverse", or "exponential"

    camera.add(listener)
    return () => camera.remove(listener)
  }, [])
  return <positionalAudio ref={sound} args={[listener]} />
}





function CoffeShop() {
  const { showButton, isMuted } = useContext(RefContext);
  //load a gltf model
  const gltf = useLoader(GLTFLoader, "models/Coffee/coffee.gltf");

  // const gltf = useLoader(GLTFLoader, "models/halo_ring/scene.gltf");

  // gltf.scene.traverse((child) => {
  //   if (child.isMesh) {
  //     // Assuming emissiveMap is available in your materials
  //     if (child.material.emissiveMap) {
  //       child.material.emissive = new THREE.Color(0xffffff); // Set emissive color
  //       child.material.emissiveIntensity = 1; // Set emissive intensity
  //       child.material.emissiveMap = child.material.map; // Set emissive map
  //     }
  //   }
  // });

  // gltf.scene.traverse(function (child) {
  //   if (child.isMesh) {
  //     child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  //   }
  // });

  // var specificMesh = gltf.scene.getObjectByName("Light");
  // //specific mesh should act like a point light source
  // const streetLight = new THREE.PointLight(0x585BFF, 10000 ); // color, intensity, distance
  // streetLight.position.set(0,-1,1 );
  // gltf.scene.add(streetLight);

  // streetLight.add(specificMesh);

  // specificMesh.material.emissive = new THREE.Color(0xff6600);
  // specificMesh.material.emissiveIntensity = 10;


  useEffect(() => {
    gltf.scene.position.set(49, -1.65, 20);
    gltf.scene.scale.set(2.5, 2.5, 2.5);
    // gltf.scene.scale.set(0.02, 0.02, 0.02);
    gltf.scene.rotateY(-Math.PI);
  }, [gltf]);

  const handleClick = () => {
    window.open('https://canteen-proj.web.app', '_blank');
  }
  return (
    <>
      <Suspense fallback={null}>
        <mesh position={[49, -1.65, 20]}>
          {!showButton &&
          <Sound url="/audio/canteen.mp3" />}
        </mesh>
        
      </Suspense>
      <primitive object={gltf.scene} onClick={handleClick} />
    </>
  )
}

export default CoffeShop