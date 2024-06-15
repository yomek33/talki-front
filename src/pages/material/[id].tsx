import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Material } from "../../types";
import { fetchMaterialById } from "../../services/api/material";
import { Textarea } from "@nextui-org/react";
import MaterialTabs from "../../components/MaterialTabs";

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
        <h2 className="font-bold text-5xl  text-rose-400">{material.title}</h2>
      </div>
      <div className="py-2">
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
      <MaterialTabs responsePhraseText={material.Phrases} />
    </div>
  );
};

export default MaterialPage;
