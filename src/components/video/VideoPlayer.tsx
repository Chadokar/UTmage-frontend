import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `${process.env.REACT_APP_FILE_BACKEND_URL}/video/${videoId}`;
    }
  }, [videoId]);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="2px dashed grey"
      borderRadius={4}
      padding={2}
      position="relative"
    >
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", height: "auto", maxHeight: "400px" }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click menu to prevent downloads
      >
        <source
          src={`${process.env.REACT_APP_FILE_BACKEND_URL}/video/${videoId}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoPlayer;
