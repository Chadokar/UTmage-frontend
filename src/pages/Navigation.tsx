import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../services/userManager";
import { AnyAction, Dispatch } from "redux";
import RequireAuth from "../components/RequireAuth";
import {
  errorPageStyle,
  navCustomizationItems,
  navItems,
  navProfileItems,
  navVideoItems,
} from "../services/routes";
import { RootState } from "../redux/store";
import Loader from "../components/Loader";
// import { UseQueryResult, useQuery } from "@tanstack/react-query";
// import { axiosGet } from "../services/querycalles";
// import { setVideo } from "../redux/reducers/Video";
const LazyProfile = React.lazy(() => import("./Profile"));
const LazyChannelCustomization = React.lazy(
  () => import("./ChannelCustomization")
);
const LazyVideoupload = React.lazy(() => import("./Videoupload"));

const Navigation: React.FC = () => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const navigate = useNavigate();
  const userdata = useSelector((state: RootState) => state.user);

  const id = useSelector((state: RootState) => state.videoId.data);
  // console.log("userdata: ", userdata);

  // const { isLoading, data, error, isSuccess }: UseQueryResult<any, any> =
  //   useQuery({
  //     queryKey: ["videos", { id }],
  //     queryFn: async (): Promise<any> => {
  //       const response = await axiosGet<any>(`http://localhost:8001/video/`, {
  //         id: id || undefined,
  //       });
  //       return response.data;
  //     },
  //     refetchOnWindowFocus: false,
  //     // refetchOnMount: false,
  //     retry: 2,
  //   });

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setVideo(data));
  //     localStorage.setItem("video", JSON.stringify(data));
  //   } else if (error) {
  //     const val = {
  //       data: {
  //         video: "error",
  //         success: false,
  //       },
  //     };
  //     localStorage.setItem("video", JSON.stringify(val));
  //   }
  // }, [data, isSuccess, error]);

  useEffect(() => {
    fetchUserData(dispatch, navigate);
  }, [localStorage.getItem("token")]);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        {navItems
          .filter((item) => !item.protected)
          .map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={item.element}
              errorElement={item.errorElement}
            />
          ))}
        <Route element={<RequireAuth />}>
          {navItems
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <LazyProfile />
              </Suspense>
            }
          >
            {navProfileItems.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={item.element}
                errorElement={item.errorElement}
              />
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/customization"
            element={
              <Suspense fallback={<Loader />}>
                <LazyChannelCustomization />
              </Suspense>
            }
          >
            {navCustomizationItems.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={item.element}
                errorElement={item.errorElement}
              />
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/video/:videoId"
            element={
              <Suspense fallback={<Loader />}>
                <LazyVideoupload />
              </Suspense>
            }
          >
            {navVideoItems.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={item.element}
                errorElement={item.errorElement}
              />
            ))}
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div style={errorPageStyle}>
              <h1>Error! Page not found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default Navigation;
