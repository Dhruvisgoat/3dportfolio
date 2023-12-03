import React, { useRef, useEffect, useState } from 'react';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';


const FullscreenButton = () => {
    const fullscreenButtonRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);
    // Function to toggle fullscreen mode
    const toggleFullscreen = () => {
        const element = document.documentElement;

        if (document.fullscreenElement) {
            // If already in fullscreen, exit fullscreen
            setIsFullscreen(false);
            document.exitFullscreen();
        } else {
            setIsFullscreen(true);
            // Enter fullscreen
            element.requestFullscreen().catch((err) => {
                console.error('Error attempting to enable fullscreen:', err.message);
            });
        }
    };

    // Add event listener for fullscreen change
    useEffect(() => {
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

    return (
        <div>
            <button ref={fullscreenButtonRef} onClick={toggleFullscreen}
                style={{ border: 'none', backgroundColor: 'blue', position: 'absolute', left: '10px', top: '10px', zIndex: '2' }}
            >
                {
                    isFullscreen ?
                        <FullscreenExitIcon sx={{ fontSize: '2rem', color: 'white' }} />
                        :
                        <FullscreenRoundedIcon sx={{ fontSize: '2rem', color: 'white' }} />
                }
            </button>
        </div>
    );
};

export default FullscreenButton;