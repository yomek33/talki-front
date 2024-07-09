import React from "react";
import SubmitMaterialForm from "../components/Material/SubmitMaterialForm";
import { Material } from "../types";

const SubmitPage: React.FC = () => {
  const handleMaterialSubmit = (submittedMaterial: Material) => {
    console.log("Material submitted successfully:", submittedMaterial);
    // You can handle post-submission logic here, such as redirecting the user
  };

  return (
    <div>
      <SubmitMaterialForm onMaterialSubmit={handleMaterialSubmit} />
    </div>
  );
};

export default SubmitPage;
