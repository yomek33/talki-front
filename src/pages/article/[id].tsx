import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../../types";
import { fetchArticleById } from "../../services/api/article";
import PhraseList from "../../components/Phrase/PhraseList";

const ArticlePage: React.FC = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching article with ID:", id);
        const fetchedArticle = await fetchArticleById(id);
        console.log("Fetched article:", fetchedArticle);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Error fetching article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {article.Phrases && article.Phrases.length > 0 && (
        <PhraseList phrases={article.Phrases} />
      )}
    </div>
  );
};

export default ArticlePage;
