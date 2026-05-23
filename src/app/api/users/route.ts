import { User } from "@/types/UserTypes";
import { readJsonFile, writeJsonFile } from "@/utils/fileHandler";
import { NextResponse } from "next/server";

type UsersFileData = {
  users: User[];
};

const USERS_FILE_PATH = ["src", "app", "api", "users", "data.json"];

export async function GET() {
  const data = await readJsonFile<UsersFileData>(USERS_FILE_PATH);

  return NextResponse.json(data.users);
}

export async function POST(request: Request) {
  const userPayload = (await request.json()) as Omit<User, "id" | "createdAt">;
  const data = await readJsonFile<UsersFileData>(USERS_FILE_PATH);

  const user: User = {
    ...userPayload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const nextData = {
    users: [...data.users, user],
  };

  await writeJsonFile(USERS_FILE_PATH, nextData);

  return NextResponse.json({ user, ...nextData }, { status: 201 });
}
