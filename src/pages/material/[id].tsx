import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Material, Phrase } from "../../types";
import {
  fetchMaterialById,
  checkMaterialStatus,
  fetchProcessedPhrases,
} from "../../services/api/material";
import { Textarea } from "@nextui-org/react";
import MaterialTabs from "../../components/Material/MaterialTabs";
import { Progress } from "@nextui-org/react";

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
        if (!fetchedMaterial.Phrases || fetchedMaterial.Phrases.length === 0) {
          pollMaterialStatus(id, fetchedMaterial);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching material:", error);
        setError("Error fetching material");
        setLoading(false);
      }
    };

    getMaterial();
  }, [id]);

  const pollMaterialStatus = async (
    materialID: number,
    submittedMaterial: Material
  ) => {
    const interval = setInterval(async () => {
      try {
        const response = await checkMaterialStatus(materialID);
        if (response.status === "completed") {
          clearInterval(interval);
          await fetchPhrases(materialID, submittedMaterial);
        } else if (response.status === "failed") {
          clearInterval(interval);
          setError("Failed to process the material.");
          setLoading(false);
        }
      } catch (error) {
        clearInterval(interval);
        setError("Error checking material status: " + (error as Error).message);
        setLoading(false);
      }
    }, 5000);
  };

  const fetchPhrases = async (
    materialID: number,
    submittedMaterial: Material
  ) => {
    try {
      const responsePhrasesData: Phrase[] = await fetchProcessedPhrases(
        materialID
      );
      submittedMaterial.Phrases = responsePhrasesData;
      setMaterial(submittedMaterial);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching processed phrases:", error);
      setError("Error fetching processed phrases: " + (error as Error).message);
      setLoading(false);
    }
  };

  if (loading && !material) {
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
        <h2 className="font-bold text-5xl text-rose-400">{material.title}</h2>
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
      {loading && (
        <Progress isIndeterminate aria-label="Loading..." color="danger" />
      )}
      <MaterialTabs material={material} />
    </div>
  );
};

export default MaterialPage;
