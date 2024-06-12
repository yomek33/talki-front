// components/ArticleItem.tsx
import React from "react";
import { Article } from "../../types";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface ArticleItemProps {
  article: Article;
}

const ArticleListItem: React.FC<ArticleItemProps> = ({ article }) => {
  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Link to={`/article/${article.ID}`}>
      <div>
        <Card>
          <CardBody>
            <CardHeader>
              <h2>{article.title}</h2>
            </CardHeader>
            <p>{truncateContent(article.content, 50)}</p>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default ArticleListItem;
