// api.ts
import { BACKEND_URI } from "../../config/config";
import { Article } from "../../types";

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${BACKEND_URI}/api/articles`, {
    credentials: "include",
  });
  console.log("fetch articles response", response);
  return response.json();
};

export const fetchArticleById = async (id: number): Promise<Article> => {
  const response = await fetch(`${BACKEND_URI}/api/articles/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch the article");
  }

  const data = await response.json();
  return data;
};
