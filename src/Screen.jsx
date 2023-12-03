import React from 'react'
import { useContext } from "react";
import { RefContext } from "./context/context";
import { Canvas } from "@react-three/fiber";
import CarShow from "./CarShow.jsx";
import { Environment } from '@react-three/drei';
import { useMediaQuery } from '@material-ui/core';
import { useRef } from "react";
import { ArrowUI } from "./ArrowUI";
import MusicPlayer from "./MusicPlayer.jsx";

function Screen() {
    const isMobile = useMediaQuery('(max-width: 1408px)');
    const sceneRef = useRef();
    const { isPlaying, setIsPlaying } = useContext(RefContext);
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <>

            {!isPlaying && <button onClick={togglePlay}>Toggle</button>}

            {isPlaying &&
                <comp2>
                    <h1 style={{ textAlign: 'center', fontFamily: 'Black Ops One, cursive' }}>
                    </h1>
                    <Canvas shadows style={{ height: '100vh' }}   >
                        <scene ref={sceneRef} />
                        <CarShow />
                        <Environment files="/background/sp.hdr" resolution={1024} background={true} />
                    </Canvas>
                    <MusicPlayer />
                </comp2 >
            }
        </>
    )
}

export default Screen