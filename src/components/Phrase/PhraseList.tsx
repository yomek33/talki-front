import React from "react";
import { Phrase } from "../../types";
import PhraseListItem from "./PhraseListItem";
interface PhraseListProps {
  phrases: Phrase[];
}

const PhraseList: React.FC<PhraseListProps> = ({ phrases }) => {
  if (!Array.isArray(phrases)) {
    return <div>No phrases available</div>;
  }
  console.log(phrases);

  return (
    <ul>
      {phrases.map((phrase) => (
        <PhraseListItem key={phrase.ID} phrase={phrase} />
      ))}
    </ul>
  );
};
export default PhraseList;
