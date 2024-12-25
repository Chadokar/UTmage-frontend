import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

interface CustomVideoPlayerProps {
  id: string | number;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = () => {
  const { video } = useSelector((state: RootState) => state.video.data);
  // console.log("video: ", video);
  // console.log("video.url: ", video?.url);

  // Example videoId; replace this with dynamic ID if needed
  const videoId = "H3M4RTi_s9U";

  return (
    <div>
      <h1>Custom Video Player</h1>
      {videoId ? (
        <iframe
          width="600"
          height="340"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Video not available</p>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
