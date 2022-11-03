export interface AuthState {
  access: string | null;
  loading: boolean;
}

interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends Timestamps {
  id: number;
  name: string;
  email: string;
  books?: Book[];
}

export interface UserState {
  data: User[];
  loading: boolean;
  modal: boolean;
}

export interface Book extends Timestamps {
  id: number;
  name: string;
  author: string;
}

export interface BookState {
  data: Book[];
  loading: boolean;
  modal: boolean;
}
