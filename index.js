import express from "express";
import { connectdb } from "./mongoose.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Task from "./model.js";
import updatePriorities from "./trigger.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

async function startServer() {
  try {
    await connectdb();
    await updatePriorities();

    app.get("/tasks", async (req, res) => {
      try {
        const priority = req.query.priority;
        const progress = req.query.progress === "true"; 
        const search = String(req.query.search || "").trim(); 

        let query = {};

        if (progress) {
          query.progress = true;
          query.priority = { $ne: 2 };
        } else if (priority) {
          query.priority = { $in: priority }; 
        }

        if (search) {
          query.title = { $regex: search, $options: "i" };
        }

        const data = await Task.find(query);
        res.json({ data });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.get("/counter", async (req, res) => {
      try {
        const data = await Task.find();
        res.json({ data });
      } catch (error) {
        console.error("Error fetching counter data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  

    app.post("/tasks", async (req, res) => {
      try {
        const { title, description, deadline, priority } = req.body;

        if (!title || !description || !deadline || !priority) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        await Task.create({ title, description, deadline, priority });
        await updatePriorities();
        res.status(201).json({ message: "Task has been created successfully" });
      } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Failed to create task" });
      }
    });

    app.put("/tasks/:id", async (req, res) => {
      try {
        const {id} = req.params;
        const { request } = req.body;

        if (!id || !request) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const task = Task.findById(id); 

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        if (request === "4") {
          await Task.findByIdAndUpdate(id, { progress: true });
        } else if (request === "2") {
          await Task.findByIdAndUpdate(id, { priority: 2 });
        } else {
          return res.status(400).json({ message: "Invalid request type" });
        }

        res.json({ message: "Task updated successfully" });
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
      }
    });
    app.delete("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        const task = Task.findById(id);
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(id);
        await updatePriorities();
        res.json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
      }
    });
    const port = process.env.PORT || 4001;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
}

startServer();