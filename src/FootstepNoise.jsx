import React, { useContext, useEffect, useState, useRef } from 'react'
import ReactHowler from 'react-howler'
import { RefContext } from './context/context'

function FootstepNoise() {
  let { isFootstepPlayingRef } = useContext(RefContext);
  // re render this as soon as isFootstepPlaying Ref value changes 
  useEffect(() => {
    console.log("isFootstepPlayingRef changed");
  }, [isFootstepPlayingRef.current]);

  return (
    <>
      <ReactHowler
        src="./audio/steps.mp3"
        playing={true}
        mute={!isFootstepPlayingRef.current}
        loop={true} />
      <div>
        {(isFootstepPlayingRef.current) && <>hi how are u
        </>
        }
      </div>
    </>
  )
}

export default FootstepNoise