import React, { useEffect, useState, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import { RefContext } from "./context/context";
import { useContext } from "react";

export function WalkingMan() {
  const position = { x: 40, z: 0 };
  const audio= new Audio('./audio/step.mp3');
  // Declare isUpArrowPressed as a ref
  let {   isFootstepPlayingRef,isUpArrowPressed, isDownArrowPressed } = useContext(RefContext);

  const gltf = useLoader(GLTFLoader, "models/manWalking/scene.gltf", 
  (loader) => {
    loader.truncateDrawRange = 3;
  });

  gltf.scene.scale.set(0.03, 0.03, 0.03);

  const mixer = new AnimationMixer(gltf.scene);
  const animations = gltf.animations;
  const animationClip = animations[0];
  const animationAction = mixer.clipAction(animationClip);
  animationAction.play();

  useEffect(() => {
    gltf.scene.position.set(position.x, 0, position.z);
  }, [gltf, position]);

  //add event listeners for keydown and keyup
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp") {
        isUpArrowPressed.current = true;
      } else if (e.key === "ArrowDown") {
        isDownArrowPressed.current = true;
      }
    };

    const handleKeyRelease = (e) => {
      if (e.key === "ArrowUp") {
        isUpArrowPressed.current = false;
      } else if (e.key === "ArrowDown") {
        isDownArrowPressed.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }
  , []);

  let angle = 0;
  let lastX = 40-20 * Math.sin( 0.5);
  let lastZ = 0+10 * Math.cos( 0.5);

  useFrame((state, delta) => {
    // if unpaused and the up arrow is pressed, then update the mixer
    const radius = 40;

    if (isUpArrowPressed.current) {
      isFootstepPlayingRef.current = true;
      // setIsFootstepPlaying(true);
      console.log('isfoot'+isFootstepPlayingRef.current)
      console.log('angle when pressing', angle);
      // audio.play();
      mixer.update(delta);
      angle += 0.01;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      gltf.scene.position.x = x;
      gltf.scene.position.z = z;
      gltf.scene.rotation.y = -angle;
      state.camera.position.set(x + 20 * Math.sin(angle + 0.5), 7, z - 10 * Math.cos(angle));
      state.camera.lookAt(x - 10 * Math.sin(angle + 0.5), 7, z + 10 * Math.cos(angle + 0.5));
      lastX = x - 20 * Math.sin(angle + 0.5);
      lastZ = z + 10 * Math.cos(angle + 0.5);
    }
    else if (isDownArrowPressed.current) {
      // audio.play();
      // Update position and rotation for the down arrow key
      isFootstepPlayingRef.current = true;
      angle -= 0.01;
      mixer.update(-delta);
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      gltf.scene.position.x = x;
      gltf.scene.position.z = z;
      gltf.scene.rotation.y = -angle;
      state.camera.position.set(
        x + 20 * Math.sin(angle + 0.5),
        7,
        z - 10 * Math.cos(angle)
      );
      state.camera.lookAt(
        x - 10 * Math.sin(angle + 0.5),
        7,
        z + 10 * Math.cos(angle + 0.5)
      );
      lastX = x - 20 * Math.sin(angle + 0.5);
      lastZ = z + 10 * Math.cos(angle + 0.5);
    } else {
      state.camera.lookAt(lastX, 7, lastZ);
      isFootstepPlayingRef.current = false;
      // setIsFootstepPlaying(false);
      // audio.pause();
    }

  });

  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
}
