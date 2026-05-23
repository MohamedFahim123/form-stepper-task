import { NextResponse } from "next/server";
import { countries } from "./data";

export async function GET() {
  return NextResponse.json(countries);
}
