import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "e43df7c9-07d0-4d6b-a11e-4e4b82f7c552",
  },
});

export const getUsers = (id, usersCountOnThePage) => {
  return instance
    .get(`users?page=${id}&count=${usersCountOnThePage}`)
    .then((data) => data.data);
};

export const followUser = (id) => {
  return instance.post(`follow/${id}`);
};

export const unfollowUser = (id) => {
  return instance.delete(`follow/${id}`);
};

export const getRequest = (path) => {
  return instance.get(path);
};

export const getStatus = (userId) => {
  return instance.get("profile/status/" + userId);
};

export const sendStatus = (status) => {
  return instance.put("profile/status", { status });
};

export const login = (email, password, rememberMe, captcha) => {
  return instance.post("auth/login", { email, password, rememberMe, captcha });
};

export const logout = () => {
  return instance.delete("auth/login");
};

export const sendPhoto = (photo) => {
  const formData = new FormData();
  formData.append("image", photo);
  return instance.put("profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProfile = (profile) => {
  return instance.put("profile", profile);
};

export const sendCaptcha = () => {
  return instance.get("security/get-captcha-url");
};
