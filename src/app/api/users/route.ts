import type { User } from "@/types/UserTypes";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsersAction();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const userPayload = (await request.json()) as Omit<User, "id" | "createdAt">;
  const users = await createUserAction(userPayload);

  return NextResponse.json({ users }, { status: 201 });
}
