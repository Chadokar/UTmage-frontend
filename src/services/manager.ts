import axios, { AxiosProgressEvent } from "axios";
import createToast from "./createToast";
import qs from "query-string";
import { axiosPostRequest } from "./querycalles";

export const uploadFileToYT = async (
  file: File | string,
  url: string,
  setProgress: any,
  name: string,
  queryObj?: any | undefined
) => {
  const formData = new FormData();
  formData.append(name, file);
  try {
    // stop video upload if the file is more than 10MB
    if (file instanceof File && file.size > 10000000) {
      createToast("File can not be more than 10MB", "error");
      return;
    }
    const query = qs.stringify(queryObj ? queryObj : "");
    const response = await axios.post(
      `${url}?${query ? query : ""}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            const percentCompleted = Math.round((loaded * 100) / total);
            setProgress(percentCompleted);
          }
        },
      }
    );
    createToast("File uploaded successfully", "success");
    return response.data;
    // return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    createToast("Error uploading file", "error");
    return error;
  }
};

export const tilteDescriptionSubmit = async ({
  id,
  title,
  description,
}: {
  id?: string | undefined;
  title: string;
  description: string;
}) => {
  try {
    const response = await axiosPostRequest<any>(
      `${process.env.REACT_APP_FILE_BACKEND_URL}/video/create`,
      { id },
      { title, description }
    );
    if (response.data.success)
      createToast("Video created/Updated successfully", "success");
    return response.data;
    console.log("response: ", response.data);
  } catch (error: any) {
    console.error("Error uploading video: ", error);
  }
};
