import { atomWithStorage } from "jotai/utils";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../types";

export const firebaseUserAtom = atomWithStorage<FirebaseUser | null>(
  "firebaseUserAtom",
  null
);
export const loadingAtom = atomWithStorage<boolean>("loadingAtom", true);
export const verifyUserByBackendAtom = atomWithStorage<boolean>(
  "verifyUserByBackendAtom",
  false
);

export const userAtom = atomWithStorage<User | null>("userAtom", null);
