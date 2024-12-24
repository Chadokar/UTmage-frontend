import React, { Suspense } from "react";
import { NavItem } from "../types";
import Error from "../components/Error";
import Loader from "../components/Loader";

const LazyHome = React.lazy(() => import("../pages/Home"));
const LazyLogin = React.lazy(() => import("../pages/Login"));
const LazyAuthMediator = React.lazy(() => import("../pages/AuthMediator"));
const LazyProfileHome = React.lazy(() => import("../pages/ProfileHome"));
const LazyPlaylistPage = React.lazy(() => import("../pages/PlaylistPage"));
const LazyCommunityPage = React.lazy(() => import("../pages/CommunityPage"));
const LazyBasicCustomization = React.lazy(
  () => import("../components/customize/BasicCustomize")
);

// video
const LazyUploadForm = React.lazy(
  () => import("../components/video/UploadForm")
);
const LazyVideoEditor = React.lazy(
  () => import("../components/video/VideoEditor")
);
const LazyVideoWriter = React.lazy(
  () => import("../components/video/VideoWriter")
);
const LazyVideoDesigner = React.lazy(
  () => import("../components/video/VideoDesigner")
);

// channel customization
const LazyBrandingCustomization = React.lazy(
  () => import("../components/customize/BrandingCustomize")
);
const LazyLayoutCustomization = React.lazy(
  () => import("../components/customize/LayoutCustomize")
);

// forgot password
const LazyForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const LazyVerifyOtp = React.lazy(() => import("../pages/VerifyOtp"));
const LazyResetPassword = React.lazy(() => import("../pages/ResetPassword"));

export const errorPageStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "black",
  color: "white",
};

export const navItems: NavItem[] = [
  {
    path: "/",
    label: "home",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyHome />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/login",
    label: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyLogin />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/googleauth",
    label: "authmediator",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyAuthMediator />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  // {
  //   path: "/profile",
  //   label: "profile",
  //   element: (
  //     <Suspense fallback={<Loader/>}>
  //       <LazyProfile />
  //     </Suspense>
  //   ),
  //   protected: true,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "customization",
  //   label: "customization",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <LazyChannelCustomization />
  //     </Suspense>
  //   ),
  //   protected: true,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "video/:id",
  //   label: "video",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <LazyVideoupload />
  //     </Suspense>
  //   ),
  //   protected: true,
  //   errorElement: <Error />,
  // },
  {
    path: "forgotpassword",
    label: "video",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyForgotPassword />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "verifytoken/:token",
    label: "video",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyVerifyOtp />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "verifytoken/:token",
    label: "video",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyResetPassword />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
];

export const navVideoItems: NavItem[] = [
  {
    path: "",
    label: "home",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyUploadForm />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "editor",
    label: "editor",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyVideoEditor />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "writer",
    label: "writer",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyVideoWriter />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "designer",
    label: "designer",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyVideoDesigner />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
];

export const navProfileItems: NavItem[] = [
  {
    path: "",
    label: "profile",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyProfileHome />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "playlists",
    label: "playlists",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyPlaylistPage />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "community",
    label: "community",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyCommunityPage />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
];

export const navCustomizationItems: NavItem[] = [
  {
    path: "",
    label: "",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyBasicCustomization />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "branding",
    label: "branding",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyBrandingCustomization />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
  {
    path: "layout",
    label: "layout",
    element: (
      <Suspense fallback={<Loader />}>
        <LazyLayoutCustomization />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
];
