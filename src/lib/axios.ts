import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://newsapi.org/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`,
  },
});

export { newsAPI };
