import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/lottie/bad-emoji.json";

function ErrorLocation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current as any,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return (
    <div className="error-container" data-testid="error-container">
      <div
        ref={containerRef}
        style={{ width: "10rem" }}
        className="lottie"
      ></div>
      <h1>Oops! Something went wrong.</h1>
      <p>
        We couldn't retreive your location, please allow location or try
        different browser.
      </p>
    </div>
  );
}

export default ErrorLocation;
