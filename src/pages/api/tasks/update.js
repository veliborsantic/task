import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const task = req.body;
    const tasks = await fs.readFile(process.cwd() + "/tasks.json", "utf8");
    let data = JSON.parse(tasks);
    data = data.map((_) => (_.id === task.id ? task : _));
    await fs.writeFile(process.cwd() + "/tasks.json", JSON.stringify(data));
    return res.status(200).json(data);
  }
  return res.status(405).json("Method not allowed");
}
