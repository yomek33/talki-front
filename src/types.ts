export interface User {
  idToken: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Phrase {
  ID: number;
  Text: string;
  importance: string;
}

export interface Article {
  ID: number;
  userUID: string;
  title: string;
  content: string;
  Phrases: Phrase[];
}
