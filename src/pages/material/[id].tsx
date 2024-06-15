import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Material } from "../../types";
import { fetchMaterialById } from "../../services/api/material";
import PhraseList from "../../components/Phrase/PhraseList";

const MaterialPage: React.FC = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = Number(idString);
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMaterial = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching material with ID:", id);
        const fetchedMaterial = await fetchMaterialById(id);
        console.log("Fetched material:", fetchedMaterial);
        setMaterial(fetchedMaterial);
      } catch (error) {
        console.error("Error fetching material:", error);
        setError("Error fetching material");
      } finally {
        setLoading(false);
      }
    };

    getMaterial();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!material) {
    return <div>Material not found</div>;
  }

  return (
    <div>
      <h1>{material.title}</h1>
      <p>{material.content}</p>
      {material.Phrases && material.Phrases.length > 0 && (
        <PhraseList phrases={material.Phrases} />
      )}
    </div>
  );
};

export default MaterialPage;
