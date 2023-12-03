import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import CarShow from "./CarShow.jsx";
import { RefProvider } from "./context/context";
import { Environment } from '@react-three/drei';
import { useMediaQuery } from '@material-ui/core';
import { Loader } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import 'react-awesome-button/dist/styles.css';
import CenteredButton from "./CenterredButton.jsx";
import DancingBot from "./DancingBot.jsx";
import { RefContext } from "./context/context";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useContext } from "react";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';

const ToggleMute = () => {
  const { isMuted, setIsMuted } = React.useContext(RefContext);

  const handleMute = () => {
    setIsMuted(!isMuted);
  }

  return (
    <AwesomeButton type="primary" onPress={handleMute}>
      {isMuted ? 'Unmute' : 'Mute'}
    </AwesomeButton>)
}


function App() {
  const { progress } = useProgress();
  const errors = useProgress((state) => state.errors)

  return (
    <>
      <RefProvider>
        {progress === 100 && <CenteredButton />}
        <Canvas shadows style={{ height: '100vh' }}>
          <Suspense fallback={null}>
            <CarShow />
            <Environment files="/background/sp.hdr" resolution={1024} background={true} />
            <EffectComposer>
              {/* <DepthOfField focusDistance={0} focalLength={0.5} bokehScale={2} height={480} /> */}
              {/* <Bloom  /> */}
              {/* <Noise opacity={0.02} /> */}
              <Vignette eskil={false} offset={0.2} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>
        <Loader />
      </RefProvider>
    </>
  );
}
export default App;