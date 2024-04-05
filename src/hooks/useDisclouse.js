import React, { useState } from 'react'

const useDisclouse = () => {

    
  const [open, setopen] = useState(false);

  const onOpen = () => {
    setopen(true);
  };
  const onClose = () => {
    setopen(false);
  };


  return {open,onClose,onOpen}
}

export default useDisclouse