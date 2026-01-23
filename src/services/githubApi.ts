import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 15000,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

githubApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("gh_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default githubApi;

