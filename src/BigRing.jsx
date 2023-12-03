import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { PositionalAudio } from "@react-three/drei";
import { useContext } from "react";
import { RefContext } from "./context/context";

export function BigRing() {
    const { showButton } = useContext(RefContext);

    const gltf = useLoader(GLTFLoader, "models/starfighter/scene.gltf");

    useEffect(() => {
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(50, 20, 50);
    }, [gltf]);

    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // Assuming emissiveMap is available in your materials
            if (child.material.emissiveMap) {
                child.material.emissive = new THREE.Color(0xffffff); // Set emissive color
                child.material.emissiveIntensity = 1; // Set emissive intensity
                child.material.emissiveMap = child.material.map; // Set emissive map
            }
        }
    });

    let angle = 0;
    let radius = 100;

    useFrame((state) => {
        //make this rotate in a circular fashion of radius 100 metres
        angle += 0.01;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        gltf.scene.position.x = x;
        gltf.scene.position.z = z;
        // the nose of starship should always point towards the tangent of the circle so rotate it accordingly 
        gltf.scene.rotation.y = Math.atan2(gltf.scene.position.x - 0, gltf.scene.position.z - 0);
    }
    );


    return (
        <>
            <mesh>
                {/* {!showButton &&<PositionalAudio autoplay loop url="/audio/spaceship.mp3" distance={1} setMaxDistance={1} />} */}
                <primitive object={gltf.scene} />
            </mesh>


        </>
    );
}

