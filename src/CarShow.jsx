import React from 'react'
import { WalkingMan } from "./walkingMan.jsx";
import { Environment } from "@react-three/drei";
import { Ring } from "./ring.jsx";
import { OrbitControls, PerspectiveCamera, CubeCamera } from "@react-three/drei";
import Ground from './Ground.jsx';
import Boxes from './Boxes.jsx';
import CoffeShop from './CoffeShop.jsx';
import { BigRing } from './BigRing.jsx';
import { Car } from './Car.jsx';
import { useRef } from 'react';
import DancingBot from './DancingBot.jsx';

//memoise entire carshow 

const CarShow = React.memo(() => {

    const cameraRef = useRef();

    return (
        <>
            {/* control orbital speed of rotation */}
            <OrbitControls
                // target={[0, 0.35, 0]}
                // target={cameraRef.current.position}
                maxPolarAngle={1.45}
                minPolarAngle={1.45}
                enablePan={false}
                enableZoom={true}
                zoomspeed={0.3}
                rotateSpeed={0.2}
            />
            <PerspectiveCamera ref={cameraRef} makeDefault fov={60} position={[50, 5, -10]} />

            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <>
                        <Environment map={texture} />
                        <WalkingMan />
                    </>
                )}
            </CubeCamera>


            <pointLight position={[0, 150, 0]} intensity={40000} color={0xFFB3C7} />
            <pointLight position={[0, -150, 0]} intensity={40000} color={0x4f77c6} />
            <pointLight position={[0, 0, 150]} intensity={40000} color={0xba448d} />
            <pointLight position={[0, 0, -150]} intensity={40000} color={0x1acccc} />
            <pointLight position={[150, 0, 0]} intensity={40000} color={0xdb5c5c} />
            <pointLight position={[-150, 0, 0]} intensity={40000} color={0xFFB3C7} />

            {/* set up 6 cube point lights to simulate a point light at the origin */}

            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={1000}
                angle={Math.PI / 2}
                penumbra={1}
                position={[40, 10, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={1000}
                angle={Math.PI / 2}
                penumbra={1}
                position={[-40, 10, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <Ground />
            <Ring />
            <Boxes />
            <CoffeShop />
            <BigRing />
            <Car />
            <DancingBot />
        </>
    );
});

export default CarShow

