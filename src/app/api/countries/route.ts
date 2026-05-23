import type { Country } from "@/types/UserTypes";
import { readJsonFile } from "@/utils/fileHandler";
import { NextResponse } from "next/server";

type CountriesFileData = {
  countries: Country[];
};

const COUNTRIES_FILE_PATH = ["src", "app", "api", "countries", "data.json"];

export async function GET() {
  const data = await readJsonFile<CountriesFileData>(COUNTRIES_FILE_PATH);

  return NextResponse.json(data);
}
