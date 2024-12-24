import React, { useEffect, useRef, useCallback, ReactNode } from "react";
import { Box, Grid, CircularProgress, Button } from "@mui/material";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import AlertDialogSlide from "../components/profile/Dialog";
import ImageComponent from "../components/ImageComponent";
import HereButton from "../components/HereButton";
import fetchVideos from "../components/utils/api";
import NewVideoForm from "../components/video/NewVideoForm";
// import { FetchVideosResponse } from "../types";
// import { videoData } from "../components/utils/SampleData";

const ProfileHome: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const {
    data,
  }: // fetchNextPage,
  // hasNextPage,
  // isFetchingNextPage,
  // isLoading,
  UseInfiniteQueryResult<any, Error> = useInfiniteQuery({
    queryKey: ["videos", { page }],
    queryFn: async ({ pageParam = 1 }): Promise<any> => {
      setPage(pageParam);
      return await fetchVideos({ pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage?.length || lastPage.length < 20) return false;
      return lastPage && lastPage.length ? lastPage?.length + 1 : 1;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    staleTime: 1000 * 60 * 50,
  });

  // console.log("data: ", data);

  // const observer = useRef<IntersectionObserver | null>(null);
  // const lastVideoRef = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (isFetchingNextPage) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isFetchingNextPage, fetchNextPage, hasNextPage]
  // );

  // const handleClick = () => {
  //   axiosGet("channel/videos")
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  return (
    <Box sx={{ flexGrow: 1, p: 2, mr: 8 }}>
      <AlertDialogSlide button={<HereButton />}>
        <Box p={4}>
          <NewVideoForm />
        </Box>
      </AlertDialogSlide>
      <Grid container spacing={2}>
        {/* <Button onClick={handleClick}>Load More</Button> */}
        {data?.pages.map((page: any, index: number) => (
          <>
            {page.videos.map((video: any, i: number) => (
              <ImageComponent key={i} video={video} />
            ))}
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileHome;
