// ArticleList.tsx
import React from "react";
import { Article } from "../../types";
import ArticleListItem from "./ArticleListItem";
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
        <ArticleListItem key={article.ID} article={article} />
      ))}
    </ul>
  );
};
export default ArticleList;
