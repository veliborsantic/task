import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const task = req.body;
    const tasks = await fs.readFile(process.cwd() + "/tasks.json", "utf8");
    const data = JSON.parse(tasks);
    data.push(task);
    await fs.writeFile(process.cwd() + "/tasks.json", JSON.stringify(data));
    return res.status(200).json(data);
  }
  return res.status(405).json("Method not allowed");
}
