import fs from "fs/promises";

export async function getFileData(fileName = "metadata.json") {
  const file = await fs.readFile(`${process.cwd()}/data/${fileName}`, "utf8");

  return JSON.parse(file);
}
