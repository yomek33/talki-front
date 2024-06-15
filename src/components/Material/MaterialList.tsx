// MaterialList.tsx
import React from "react";
import { Material } from "../../types";
import MaterialListItem from "./MaterialListItem";
interface MaterialListProps {
  materials: Material[];
}
const MaterialList: React.FC<MaterialListProps> = ({ materials }) => {
  if (!Array.isArray(materials) || materials.length === 0) {
    return <div>No materials available</div>;
  }

  const reversedMaterials = [...materials].reverse();

  console.log(reversedMaterials);

  return (
    <ul>
      {reversedMaterials.map((material) => (
        <MaterialListItem key={material.ID} material={material} />
      ))}
    </ul>
  );
};

export default MaterialList;
