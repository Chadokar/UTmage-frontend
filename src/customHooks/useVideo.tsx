import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosGet } from "../services/querycalles";
import { setVideo } from "../redux/reducers/Video";

const useVideo = (
  id: string | number | null | undefined,
  dispatch: (arg0: any) => void
): {
  isLoading: boolean;
  video: any;
  error: any;
  isSuccess: boolean;
} => {
  const {
    isLoading,
    data: video,
    error,
    isSuccess,
  }: UseQueryResult<any, any> = useQuery({
    queryKey: ["videos", { id }],
    queryFn: async (): Promise<any> => {
      console.log("id: ", ["videos", { id }]);

      const response = await axiosGet<any>(`http://localhost:8001/video/`, {
        id: id,
      });
      dispatch(setVideo(response.data));
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 50,
    // refetchOnMount: false,
    retry: 2,
  });
  return { isLoading, video, error, isSuccess };
};

export default useVideo;
