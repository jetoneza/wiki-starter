import fs from "fs/promises";

export async function getFileData(fileName = "metadata.json") {
  // TODO: handle errors
  const file = await fs.readFile(`${process.cwd()}/data/${fileName}`, "utf8");

  return JSON.parse(file);
}

export async function writeToFile(data: any, fileName = "metadata.json") {
  // TODO: handle errors
  return await fs.writeFile(`${process.cwd()}/data/${fileName}`, JSON.stringify(data));
}
