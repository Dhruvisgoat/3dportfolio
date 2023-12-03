import React, { useContext, useEffect, useRef } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { RefContext } from './context/context';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import ArrowUI from './ArrowUI.jsx';
import FullscreenButton from './FullscreenButton.jsx';
import MusicPlayer from './MusicPlayer.jsx';
import { useState } from 'react';

const CenteredButton = () => {
    const isMobile = useMediaQuery('(max-width: 1408px)');
    const { showButton, setIsShowButton } = useContext(RefContext);
    const audioRef = useRef();
    const fullscreenButtonRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio('/audio/interface.mp3');
        //add this line to your code and it will work to make full screen 
        const handleFullscreenChange = () => {
            // Do something when fullscreen state changes

            console.log('Fullscreen state changed:', document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);


        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };

    }, []);
    
    const handleButtonClick = () => {
        setIsShowButton(false);
        if (audioRef.current) {
            audioRef.current.play();
        }

        // Add event listener for fullscreen change
        const element = document.documentElement;

        if (document.fullscreenElement) {
            // If already in fullscreen, exit fullscreen
            setIsFullscreen(false);
            document.exitFullscreen();
        } else {
            setIsFullscreen(true);
            // Enter fullscreen
            element.requestFullscreen().then(() => {
                if (window.screen.orientation) {
                    window.screen.orientation.lock('landscape');
                }
            }).catch((err) => {
                console.error('Error attempting to enable fullscreen:', err.message);
            });
        }
    };

    // Style for the full-screen component
    const centeredStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black', // Yellow background
        zIndex: '3', // Make sure the button is on top of other elements
    };

    return (
        <>
            {showButton && (
                <div style={centeredStyle}>
                    <AwesomeButton onPress={handleButtonClick} type="secondary" >START</AwesomeButton>
                </div>
            )}

            {!showButton &&
                <>
                    {isMobile && < ArrowUI />}
                    <FullscreenButton />
                    <MusicPlayer />
                </>}
        </>
    );
};

export default CenteredButton;