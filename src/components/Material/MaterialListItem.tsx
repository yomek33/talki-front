// components/MaterialItem.tsx
import React from "react";
import { Material } from "../../types";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface MaterialItemProps {
  material: Material;
}

const MaterialListItem: React.FC<MaterialItemProps> = ({ material }) => {
  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Link to={`/material/${material.ID}`}>
      <div className="mb-4">
        <Card shadow="sm">
          <CardBody>
            <CardHeader className="py-1 px-5">
              <h1 className="font-bold text-2xl text-rose-400">
                {material.title}
              </h1>
            </CardHeader>
            <p className="px-4">{truncateContent(material.content, 80)}</p>
          </CardBody>
        </Card>
      </div>
    </Link>
  );
};

export default MaterialListItem;
