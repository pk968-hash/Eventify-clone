import axios from "axios";
import { axiosInstance } from "./axios";

export const GetMe = async () => {
  const response = await axiosInstance.get(`/auth/me`);
  return response.data;
};

export const Logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const checkAvailability = async (email) => {
  const response = await axiosInstance.post("/auth/check-availability", email);
  return response.data;
};

export const JobseekerLogin = async (formData) => {
  const response = await axiosInstance.post("/auth/jobseeker-login", formData);
  return response.data;
};

export const JobseekerSignup = async (formData) => {
  const fd = new FormData();

  for (let key in formData) {
    if (formData[key] !== undefined && formData[key] !== null) {
      // Special case: senderBankDetails is an object
      if (key === "senderBankDetails" && typeof formData[key] === "object") {
        fd.append(key, JSON.stringify(formData[key]));
      } else {
        fd.append(key, formData[key]);
      }
    }
  }

  const response = await axiosInstance.post("/auth/jobseeker-signup", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const VerifyPersonalId = async (nationalId) => {
  const response = await axiosInstance.post("/auth/idVerify", { nationalId });
  return response.data;
};

export const EmployerSignup = async (formData) => {
  const fd = new FormData();

  // loop through sab values
  for (let key in formData) {
    if (formData[key] !== undefined && formData[key] !== null) {
      fd.append(key, formData[key]);
    }
  }

  const response = await axiosInstance.post("/auth/employer-signup", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const EmployerAvailable = async (formData) => {
  const response = await axiosInstance.post(
    "/auth/employer-available",
    formData
  );
  return response.data;
};

export const EmployerLogin = async (formData) => {
  const response = await axiosInstance.post("/auth/employer-login", formData);
  return response.data;
};
