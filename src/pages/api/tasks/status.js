import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Dobijam za status", req.body);
    const { id, newStatus } = req.body;
    const tasks = await fs.readFile(process.cwd() + "/tasks.json", "utf8");
    let data = JSON.parse(tasks);
    data = data.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    await fs.writeFile(process.cwd() + "/tasks.json", JSON.stringify(data));
    return res.status(200).json(data);
  }
  return res.status(405).json("Method not allowed");
}
