import axios, { AxiosProgressEvent } from "axios";

export const uploadFileToYT = async (
  file: File,
  url: string,
  setProgress: any,
  name: string
) => {
  const formData = new FormData();
  formData.append(name, file);
  try {
    const response = await axios.post(url, formData, {
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
    });
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
