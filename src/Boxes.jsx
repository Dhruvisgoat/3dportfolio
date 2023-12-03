import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Box = ({ position, rotation, color }) => {
    const mesh = useRef();

    useFrame(() => {
        mesh.current.rotation.x += 0.03;
        mesh.current.rotation.y += 0.03;
        mesh.current.rotation.z += 0.03;
    });

    return (
        <mesh
            position={position}
            rotation={rotation}
            scale={[1, 1, 1]}
            ref={mesh}
        >
            {/* <boxGeometry args={[1, 1, 1]} /> */}
            {/* asteroid looking random shapes */}
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const Boxes = () => {
    return (
        <>
            {
                Array.from({ length: 100 }).map((_, index) => {
                    const randomPosition = { x: (Math.random() - 0.5) * 200, y: (Math.random() * 40) + 5, z: (Math.random() - 0.5) * 200 };
                    const randomRotation = { x: Math.random() * Math.PI, y: Math.random() * Math.PI, z: Math.random() * Math.PI };
                    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

                    return (
                        <Box
                            key={index}
                            position={[randomPosition.x, randomPosition.y, randomPosition.z]}
                            rotation={[randomRotation.x, randomRotation.y, randomRotation.z]}
                            color={color}
                        />
                    );
                })
            }
        </>
    );
};

export default Boxes;