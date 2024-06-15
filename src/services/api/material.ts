// api.ts
import { BACKEND_URI } from "../../config/config";
import { Material } from "../../types";

export const fetchMaterials = async (): Promise<Material[]> => {
  const response = await fetch(`${BACKEND_URI}/api/materials`, {
    credentials: "include",
  });
  console.log("fetch materials response", response);
  return response.json();
};

export const fetchMaterialById = async (id: number): Promise<Material> => {
  const response = await fetch(`${BACKEND_URI}/api/materials/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch the material");
  }

  const data = await response.json();
  return data;
};

export const submitMaterial = async (
  data: { title: string; content: string },
  token: string
) => {
  const response = await fetch("/api/materials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Failed to submit material:", response);
    throw new Error("Failed to submit material");
  }

  return response.json();
};

export const checkMaterialStatus = async (materialID: number) => {
  if (materialID === undefined) {
    throw new Error("materialID is undefined");
  }
  console.log("materialID", materialID);
  const materialIDStr = materialID.toString();
  const response = await fetch(`/api/materials/${materialIDStr}/status`, {
    headers: {
      Authorization: "Bearer your_token_here",
    },
  });
  console.log("checkMaterialStatus response", response);
  return response.json();
};

export const fetchProcessedPhrases = async (materialID: number) => {
  if (materialID === undefined) {
    throw new Error("materialID is undefined");
  }
  const materialIDStr = materialID.toString();
  const response = await fetch(`/api/materials/${materialIDStr}/phrases`, {
    headers: {
      Authorization: "Bearer your_token_here",
    },
  });
  console.log("fetchProcessedPhrases response", response);
  return response.json();
};
