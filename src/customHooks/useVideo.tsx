import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosGet } from "../services/querycalles";

const useVideo = (
  id: string | number | null | undefined
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
      const response = await axiosGet<any>(`http://localhost:8001/video/`, {
        id: id,
      });
      console.log("response: ", response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    retry: 2,
  });
  return { isLoading, video, error, isSuccess };
};

export default useVideo;
