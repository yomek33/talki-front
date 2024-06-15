import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Material } from "../../types";
import { fetchMaterialById } from "../../services/api/material";
import PhraseList from "../../components/Phrase/PhraseList";
import { Input, Textarea } from "@nextui-org/react";

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
      <div>
        <label>
          <h2 className="font-bold text-xl  pb-2 pl-2">Title</h2>
          <Input
            fullWidth
            size="lg"
            type="text"
            variant="bordered"
            readOnly
            value={material.title}
            className="pointer-events-none bg-transparent border-black"
          />
        </label>
      </div>
      <div className="py-5">
        <label>
          <h2 className="font-bold text-xl pb-2 pl-2">Content</h2>
          <Textarea
            size="lg"
            type="text"
            variant="bordered"
            minRows={10}
            maxRows={100}
            readOnly
            value={material.content}
            className="pointer-events-none bg-transparent border-black"
          />
        </label>
      </div>
      {material.Phrases && material.Phrases.length > 0 && (
        <PhraseList phrases={material.Phrases} />
      )}
    </div>
  );
};

export default MaterialPage;
