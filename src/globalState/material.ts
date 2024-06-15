import { atom } from "jotai";
import { Material } from "../types";

export const materialsAtom = atom<Material[]>([]);
export const selectedMaterialAtom = atom<Material | null>(null);
export const materialsLoadedAtom = atom<boolean>(false);
