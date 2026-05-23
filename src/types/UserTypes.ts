export type Gender = "male" | "female";

export type Category = {
  id: number;
  name: string;
};

export type Interest = {
  id: number;
  name: string;
};

export type Country = {
  id: string;
  name: string;
};

export type UserFormValues = {
  fullName: string;
  email: string;
  gender: Gender | "";
  country?: Country | null;
  age: number | "";
  category: Category | null;
  interests: Interest[];
  avatar?: File | null;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  gender: Gender;
  country?: Country | null;
  age: number;
  category: Category;
  interests: Interest[];
  avatarUrl?: string;
  createdAt: string;
};
