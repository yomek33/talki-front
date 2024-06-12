export interface User {
  idToken: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Article {
  id: string;
  title: string;
  content: string;
}
