import { AxiosRequestConfig } from "axios";
import React from "react";

export interface NavItem {
  path: string;
  label: string;
  element: React.ReactNode;
  protected: boolean;
  errorElement: React.ReactNode;
}

export interface loginpayload {
  email: string;
  password: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  } | null;
  message?: string;
}

// Define types for request options and responses
export interface RequestOptions extends AxiosRequestConfig {
  [key: string]: any;
}

export interface RedirectResponse {
  url: string;
}

export interface GoogleAuth {
  token: string;
  channel: channel;
  success: true;
  user: user;
  error: any;
}

export type user = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_id: string;
};

export type channel = {
  // Define the properties of the getChannel type here "id", "title", "description", "url", "yt_channel_id"
  id: string;
  title: string;
  description: string;
  url: string;
  yt_channel_id: string;
};

export interface ProfileProps {
  first_name: string;
  last_name?: string;
  email: string;
  yt_channel?: string;
  thumbnail: string;
  publishedAt: string;
}

export interface ChannelProps {
  title: string;
  description: string;
  url: string;
  yt_channel_id: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  id: string | number;
}

export interface VideoProps {
  title: string;
  description: string;
  working: boolean;
  id: string | number;
  yt_channel: string | undefined;
  url: string | undefined;
}

export interface OtpVerifyResponse {
  token: string;
  success: boolean;
}

export interface RoleCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export interface Video {
  id: string;
  title: string;
  imageUrl?: string;
  uuid?: string;
}

export interface Pages {
  id: string;
  // Add other page properties here
  videos: Video[];
}

export interface FetchVideosResponse {
  pages?: Pages[];
}

export interface ImageData {
  id: string;
  title: string;
  imageUrl: string;
  backend_name: string;
}
