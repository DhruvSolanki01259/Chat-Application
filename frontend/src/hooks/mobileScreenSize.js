import { useState, useEffect } from "react";

function useMobileScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Also listen for orientation change to be more accurate on mobiles
    window.addEventListener("orientationchange", handleResize);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return size;
}

export default useMobileScreenSize;
