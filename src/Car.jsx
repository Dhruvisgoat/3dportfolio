//add low poly car to the scene 
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";
import { Environment, CubeCamera } from "@react-three/drei";
import { AnimationMixer } from "three";
import { useEffect } from "react";

export function Car() {
    const gltf = useLoader(GLTFLoader, "models/dirtCar/dirtCar.glb");

    useEffect(() => {
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(50, 1.20, 5);

    }, [gltf]);

    // animate the car 
    const mixer = new AnimationMixer(gltf.scene);
    const animations = gltf.animations;
    const animationClip = animations[0];
    const animationAction = mixer.clipAction(animationClip);
    animationAction.play();

    let angle = 0;
    const radius = 40;

    useFrame((state, delta) =>{
        mixer.update(delta);
        angle += 0.03;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        gltf.scene.position.x = x;
        gltf.scene.position.z = z;
        gltf.scene.rotation.y = -angle;
    }
    );

    return (
        <>
            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <>
                        <Environment map={texture} />
                        <primitive object={gltf.scene} />
                    </>
                )}
            </CubeCamera>
        </>
    );

}