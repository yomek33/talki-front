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

export const submitArticle = async (
  data: { title: string; content: string },
  token: string
) => {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Failed to submit article:", response);
    throw new Error("Failed to submit article");
  }

  return response.json();
};

export const checkArticleStatus = async (articleID: number) => {
  if (articleID === undefined) {
    throw new Error("articleID is undefined");
  }
  console.log("articleID", articleID);
  const articleIDStr = articleID.toString();
  const response = await fetch(`/api/articles/${articleIDStr}/status`, {
    headers: {
      Authorization: "Bearer your_token_here",
    },
  });
  console.log("checkArticleStatus response", response);
  return response.json();
};

export const fetchProcessedPhrases = async (articleID: number) => {
  if (articleID === undefined) {
    throw new Error("articleID is undefined");
  }
  const articleIDStr = articleID.toString();
  const response = await fetch(`/api/articles/${articleIDStr}/phrases`, {
    headers: {
      Authorization: "Bearer your_token_here",
    },
  });
  console.log("fetchProcessedPhrases response", response);
  return response.json();
};
