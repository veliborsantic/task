import { promises as fs } from "fs";

export default async function (req, res) {
  const tasks = await fs.readFile(process.cwd() + "/tasks.json", "utf8");
  const data = JSON.parse(tasks);
  res.status(200).json(JSON.parse(tasks));
}
