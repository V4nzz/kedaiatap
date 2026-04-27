"use client";
import { useState } from "react";
import Image from "next/image";

const poses = ["/maskot/ozzy-wave.png", "/maskot/ozzy-cute.png", "/maskot/ozzy-ngantuk.png"];

export default function FloatingMascot() {
  const [poseIdx, setPoseIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    setOpacity(0);
    setTimeout(() => {
      setPoseIdx((prev) => (prev + 1) % poses.length);
      setOpacity(1);
    }, 150);
  };

  return (
    <div
      id="float-mascot"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      title="Scroll ke atas"
    >
      <Image
        id="float-img"
        src={poses[poseIdx]}
        alt="Ozzy maskot"
        width={90}
        height={110}
        priority={false}
        style={{ opacity, transition: "opacity 0.15s", width: "90px", height: "auto" }}
      />
    </div>
  );
}
