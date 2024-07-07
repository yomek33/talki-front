export interface User {
  idToken?: string;
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

export interface Material {
  ID: number;
  userUID: string;
  title: string;
  content: string;
  Phrases: Phrase[];
}

export interface Message {
  ID: number;
  content: string;
  createdAt: string;
  materialID: number;
  chatID: number;
  sender: string;
}

export interface Chat {
  ID: number;
  messages: Message[];
  materialID: number;
  detail: string;
}
