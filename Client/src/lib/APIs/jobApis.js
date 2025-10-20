import { axiosInstance } from "../axios";

export const JobPost = async (formData) => {
  const response = await axiosInstance.post("/job/post", formData);
  return response.data;
};

export const GetJobs = async () => {
  const response = await axiosInstance.get("/job/getAll");
  return response.data;
};

export const PostJob = async (formData) => {
  const response = await axiosInstance.post("/job/post", formData);
  return response.data;
};

export const MyPostedJobs = async () => {
  const response = await axiosInstance.get("/job/my-posted-jobs");
  return response.data;
};
