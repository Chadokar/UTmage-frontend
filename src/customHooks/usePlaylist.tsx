import { axiosGet } from "../services/querycalles";
import { useQuery } from "@tanstack/react-query";

interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const usePlaylist = () => {
  const {
    isLoading: loading,
    data: playlist,
    error,
  } = useQuery({
    queryKey: ["yt-playlist"],
    queryFn: async (): Promise<Playlist[]> => {
      const response = await axiosGet<any>(`channel/videos`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 2,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 50,
  });
  return { playlist, loading, error };
};

export default usePlaylist;
