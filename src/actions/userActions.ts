"use server";

import type { User } from "@/types/UserTypes";
import { readJsonFile, writeJsonFile } from "@/utils/fileHandler";

type UsersFileData = {
  users: User[];
};

export type UserPayload = Omit<User, "id" | "createdAt">;

const USERS_FILE_PATH = ["src", "app", "api", "users", "data.json"];

export async function getUsersAction(): Promise<User[]> {
  const data = await readJsonFile<UsersFileData>(USERS_FILE_PATH);

  return data.users;
}

export async function createUserAction(
  userPayload: UserPayload,
): Promise<User[]> {
  const data = await readJsonFile<UsersFileData>(USERS_FILE_PATH);
  const user: User = {
    ...userPayload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const nextUsers = [...data.users, user];

  await writeJsonFile(USERS_FILE_PATH, { users: nextUsers });

  return nextUsers;
}
