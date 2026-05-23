import type { Interest } from "@/types/UserTypes";
import { readJsonFile } from "@/utils/fileHandler";
import { NextResponse } from "next/server";

type InterestsFileData = {
  interests: Interest[];
};

const INTERESTS_FILE_PATH = ["src", "app", "api", "interests", "data.json"];

export async function GET() {
  const data = await readJsonFile<InterestsFileData>(INTERESTS_FILE_PATH);

  return NextResponse.json(data);
}
