import { atom } from "jotai";
import { Article } from "../types";

export const articlesAtom = atom<Article[]>([]);
export const selectedArticleAtom = atom<Article | null>(null);
export const articlesLoadedAtom = atom<boolean>(false);
