import React, { createContext, useContext,useState, useRef } from "react";

// Step 1: Create a context for useRef
export const RefContext = createContext();

// Step 2: Create a provider component
export function RefProvider({ children }) {
  // Initialize a useRef object
  let isUpArrowPressed = useRef(false);
  let isDownArrowPressed = useRef(false);
  let isFootstepPlayingRef = useRef(false);
  let showButtonRef = useRef(true);
  const [isMuted, setIsMuted] = useState(false);

  
  // create a toggle for isplaying
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setIsShowButton] = useState(true);
  return (
    <RefContext.Provider value={{ isFootstepPlayingRef, isUpArrowPressed, isDownArrowPressed,isPlaying,setIsPlaying,showButtonRef,showButton,setIsShowButton,isMuted,setIsMuted }}>
      {children}
    </RefContext.Provider>
  );
}
