import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import { useEffect } from "react";
import { Suspense } from "react";
import { useContext } from "react";
import { RefContext } from "./context/context";
import React from 'react';
import { useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'

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

const DancingBot = (() => {

    const { showButton, isMuted } = useContext(RefContext);

    const gltf = useLoader(GLTFLoader, "models/robotDancing/scene.gltf");

    useEffect(() => {
        gltf.scene.position.set(50 * Math.cos(5 * Math.PI / 4), 0, 50 * Math.sin(5 * Math.PI / 4));
        gltf.scene.scale.set(4, 4, 4);
    }, [gltf]);

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    useFrame((state, delta) => {
        mixer.update(delta);
    });

    return (
        <>
            <Suspense fallback={null}>
                <mesh position={[50 * Math.cos(5 * Math.PI / 4), 0, 50 * Math.sin(5 * Math.PI / 4)]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="white" />
                    {/* {!showButton &&
                        <PositionalAudio autoplay loop url="/audio/dancingBot.mp3"
                        />} */}

                   {!showButton &&
                        <Sound url="/audio/dancingBot.mp3" />}
                </mesh> 
            </Suspense>
            <primitive object={gltf.scene} />
        </>
    );
});

export default DancingBot;
