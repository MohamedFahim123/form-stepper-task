import { promises as fs } from "fs";
import path from "path";

export type JsonFilePath = string | string[];

function resolveFilePath(filePath: JsonFilePath) {
  // Array paths are resolved from the project root for shared API data files.
  return Array.isArray(filePath)
    ? path.join(/* turbopackIgnore: true */ process.cwd(), ...filePath)
    : filePath;
}

export async function readJsonFile<TData>(
  filePath: JsonFilePath,
): Promise<TData> {
  const file = await fs.readFile(resolveFilePath(filePath), "utf8");

  return JSON.parse(file) as TData;
}

export async function writeJsonFile<TData>(
  filePath: JsonFilePath,
  data: TData,
): Promise<void> {
  await fs.writeFile(
    resolveFilePath(filePath),
    JSON.stringify(data, null, 2),
    "utf8",
  );
}
