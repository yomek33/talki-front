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
      <div className="flex justify-between items-center pb-5">
        <h1 className="font-bold text-5xl text-emerald-300">Materials</h1>
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/send")}
            className="py-3 px-5 text-lg  font-semibold border-2 text-blue-400 border-blue-400"
          >
            Create New Material
          </Button>
        </div>
      </div>
      <MaterialList materials={materials} />
    </>
  );
};

export default MaterialsPage;
