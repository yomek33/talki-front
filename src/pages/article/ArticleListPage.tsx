import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { articlesAtom, articlesLoadedAtom } from "../../globalState/article";
import { fetchArticles } from "../../services/api/article";
import ArticleList from "../../components/Article/ArticleList";
import { Link } from "react-router-dom";

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useAtom(articlesAtom);
  const [articlesLoaded, setArticlesLoaded] = useAtom(articlesLoadedAtom);

  useEffect(() => {
    if (!articlesLoaded) {
      console.log("fetching articles");
      const loadArticles = async () => {
        const articles = await fetchArticles();
        setArticles(articles);
        setArticlesLoaded(true);
      };
      loadArticles();
    }
  }, [articlesLoaded, setArticles, setArticlesLoaded]);

  return (
    <div>
      <h1>Articles</h1>
      <Link to="/send">New Article</Link>
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticlesPage;
