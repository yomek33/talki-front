// components/ArticleItem.tsx
import React from "react";
import { Article } from "../../types";
import { Link } from "react-router-dom";

interface ArticleItemProps {
  article: Article;
}

const ArticleListItem: React.FC<ArticleItemProps> = ({ article }) => {
  return (
    <div>
      <h2>
        <Link to={`/article/${article.id}`}>{article.title}</Link>
      </h2>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleListItem;
