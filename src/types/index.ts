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
