// ArticleList.tsx
import React from "react";
import { Article } from "../../types";
import { Link } from "react-router-dom";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (!Array.isArray(articles)) {
    return <div>No articles available</div>;
  }
  console.log(articles);

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.ID}>
          <Link to={`/article/${article.ID}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
