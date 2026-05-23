import type { User } from "@/types/UserTypes";
import { NextResponse } from "next/server";
import { users } from "./data";

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const userPayload = (await request.json()) as Omit<User, "id" | "createdAt">;
  const user: User = {
    ...userPayload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);

  return NextResponse.json({ users }, { status: 201 });
}
