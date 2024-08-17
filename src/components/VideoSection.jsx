import React from "react";
import vedio from "../assets/Fashion Rhythm.mp4";

const VideoSection = () => {
  return (
    <div className="container overflow-hidden w-1/2 relative">
      <video
        className="rounded-xl w-full h-full hover:drop-shadow-2xl object-cover"
        src={vedio}
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default VideoSection;
