import axios from "axios";
import { axiosGet } from "../../services/querycalles";

interface Video {
  id: string;
  // Add other video properties here
}

interface FetchVideosResponse {
  videos: Video[];
}

const fetchVideos = async ({ pageParam = 1 }): Promise<FetchVideosResponse> => {
  const response = await axiosGet<FetchVideosResponse>(
    `${process.env.REACT_APP_FILE_BACKEND_URL}/video/videos?page=${pageParam}`
  );
  return response.data;
};

export default fetchVideos;
