const Task = require("../models/Task");

const TaskController = {
	async allTasks(req, res) {
		try {
			const tasks = await Task.find();
			res.send(tasks);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error while getting all tasks" });
		}
	},
	async createTask(req, res) {
		try {
			const task = await Task.create({
				title: req.body.title,
				completed: false,
			});
			res.status(201).send(task);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "ha habido un problema al crear el task", error });
		}
	},

	async getTaskById(req, res) {
		try {
			const task = await Task.findById(req.params.id);
			if (!task)
				return res.status(404).json({ message: "Tarea no encontrada" });
			res.status(200).json({ message: "que tengas un buen dia todo ok", task });
		} catch (error) {
			res.status(500).send({ message: "todo mal", error });
		}
	},

	async markAsCompleted(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(
				req.params.id,
				{
					completed: true,
				},
				{ new: true }
			);
			if (!task) {
				return res.status(404).json({ message: "task not found" });
			}
			res.status(200).json({ message: "completed ok", task });
		} catch (error) {
			res.status(500).json({ message: "fatal error", error });
		}
	},

	async taskUpdate(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
					$inc: {
						__v: 1,
					},
				},
				{ new: true }
			);
			res.status(200).json({ message: "Post updated successfully", task });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "error fatal", error });
		}
	},
	async deleteTask(req, res) {
		try {
			const task = await Task.findByIdAndDelete(req.params.id);
			if (!task) return res.status(404).json({ error: "task not found" });
			res.json({ message: "delete task" });
		} catch (error) {
			res.status(500).json({ mesage: "error fatal" });
		}
	},

	async markAsUncompleted(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(
				req.params.id,
				{ completed: false },
				{ new: true }
			);
			if (!task) {
				return res.status(404).json({ message: "task not found" });
			}
			res.status(200).json({ message: "uncompleted ok", task });
		} catch (error) {
			res.status(500).json({ message: "fatal error", error });
		}
	},
};

module.exports = TaskController;
