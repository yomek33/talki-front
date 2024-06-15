import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { materialsAtom, materialsLoadedAtom } from "../../globalState/material";
import { fetchMaterials } from "../../services/api/material";
import MaterialList from "../../components/Material/MaterialList";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useAtom(materialsAtom);
  const [materialsLoaded, setMaterialsLoaded] = useAtom(materialsLoadedAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!materialsLoaded) {
      console.log("fetching materials");
      const loadMaterials = async () => {
        const materials = await fetchMaterials();
        setMaterials(materials);
        setMaterialsLoaded(true);
      };
      loadMaterials();
    }
  }, [materialsLoaded, setMaterials, setMaterialsLoaded]);
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Materials</h1>
        <Button
          color="primary"
          variant="ghost"
          onClick={() => navigate("/send")}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Create New Material
        </Button>
      </div>
      <MaterialList materials={materials} />
    </>
  );
};

export default MaterialsPage;
