import { atom } from "jotai";
import { User as FirebaseUser } from "firebase/auth";

export const userAtom = atom<FirebaseUser | null>(null);
export const loadingAtom = atom<boolean>(true);
export const verifyUserByBackendAtom = atom<boolean>(false);
