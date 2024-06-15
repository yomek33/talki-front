// components/phraseItem.tsx
import React from "react";
import { Phrase } from "../../types";
import { Card, CardBody } from "@nextui-org/react";

interface PhraseItemProps {
  phrase: Phrase;
}

const PhraseListItem: React.FC<PhraseItemProps> = ({ phrase }) => {
  return (
    <div className="mb-3">
      <Card shadow="sm">
        <CardBody>
          <p>{phrase.Text}</p>
        </CardBody>
      </Card>
    </div>
  );
};
export default PhraseListItem;
