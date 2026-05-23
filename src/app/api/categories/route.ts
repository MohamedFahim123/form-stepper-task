import type { Category } from "@/types/UserTypes";
import { readJsonFile } from "@/utils/fileHandler";
import { NextResponse } from "next/server";

type CategoriesFileData = {
  categories: Category[];
};

const CATEGORIES_FILE_PATH = ["src", "app", "api", "categories", "data.json"];

export async function GET() {
  const data = await readJsonFile<CategoriesFileData>(CATEGORIES_FILE_PATH);

  return NextResponse.json(data.categories);
}
