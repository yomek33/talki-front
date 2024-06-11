import { atomWithStorage } from "jotai/utils";
import { User as FirebaseUser } from "firebase/auth";

export const userAtom = atomWithStorage<FirebaseUser | null>("userAtom", null);
export const loadingAtom = atomWithStorage<boolean>("loadingAtom", true);
export const verifyUserByBackendAtom = atomWithStorage<boolean>(
  "verifyUserByBackendAtom",
  false
);
