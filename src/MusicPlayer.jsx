import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactHowler from 'react-howler'
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { RefContext } from './context/context';


const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [seekPosition, setSeekPosition] = useState(0);
    const howlerRef = useRef(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (howlerRef.current) {
                if (document.hidden) {
                    howlerRef.current.pause();
                    setIsPlaying(false);
                    setSeekPosition(howlerRef.current.seek());
                } else {
                    howlerRef.current.seek(seekPosition);
                    howlerRef.current.play();
                    setIsPlaying(true);
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [seekPosition]);

    const handleMuteToggle = () => {
        if (isMuted) {
            setIsMuted(false);
        } else {
            howlerRef.current.mute();
            setIsMuted(true);
        }
    };

    return (
        
        <div style={{position:'absolute',right:'10px',top:'10px',zIndex:'2' }}>
                <ReactHowler
                    src='./audio/SpaceSound.mp3'
                    playing={isPlaying}
                    mute={isMuted}
                    seek={seekPosition}
                    ref={howlerRef}
                    loop={true}
                    volume={0.5}
                />
                <button
                    style={{
                        fontSize: '2rem', // Set size
                        border: 'none', // Remove the border
                        background: 'red', // Make the background transparent
                        cursor: 'pointer', // Add a pointer cursor for interaction
                    }}
                    onClick={handleMuteToggle}>{isMuted ? <VolumeUpRoundedIcon sx={{ color: 'white' }} /> : <VolumeMuteRoundedIcon sx={{ color: 'white' }} />}</button>
            </div> 
    );
};

export default MusicPlayer;