import React from 'react'
import { RefContext } from './context/context'
import { useContext, useEffect, useRef } from 'react';

function ArrowUI() {

    // const { isUpArrowPressed, isDownArrowPressed } = useContext(RefContext);
    let { isUpArrowPressed, isDownArrowPressed } = useContext(RefContext);
    
    const handleTouchUpStart = () => {
        console.log('it has been touched')
        isUpArrowPressed.current = true;
    };

    const handleTouchUpEnd = () => {
        isUpArrowPressed.current = false;
    };

    const handleTouchDownStart = () => {
        isDownArrowPressed.current = true;
    }
    const handleTouchDownEnd = () => {
        isDownArrowPressed.current = false;
    }

    return (
        <div style={{ zIndex: '1', position: 'absolute', top: '40vh', right: '-30px', transform: 'translateX(-50%)' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onTouchStart={handleTouchUpStart} onTouchEnd={handleTouchUpEnd}
                    style={{ userSelect: 'none', backgroundColor: 'blue', fontSize: '2rem', opacity: 0.9, color: 'white' }}
                >
                    ▲ 
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
    
                <button
                    onTouchStart={handleTouchDownStart} onTouchEnd={handleTouchDownEnd}
                    style={{ userSelect: 'none', margin: '5px', backgroundColor: 'red', fontSize: '2rem', opacity: 0.9, color: 'white' ,hover: { backgroundColor: 'white', color: 'black' }}}
                >
                    ▼
                </button>
            </div>
        </div>
    )
}

export default ArrowUI