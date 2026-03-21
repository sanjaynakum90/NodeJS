import express from "express";
import HttpError from "./middleware/HttpError.js";

const app = express();


app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

let taskList = [
    {
        id: 1,
        task: "learn",
        description: "you have to learn new things daily",
    },
    {
        id: 2,
        task: "practice",
        description: "you have to practice daily",
    },
];

app.get("/taskList", (req, res) => {
    if (taskList.length <= 0) {
        return res.status(200).json("task list is empty");
    }

    res
        .status(200)
        .json({ message: "task list data retrieved successfully", taskList });
});

// now getting data using specific id

app.get("/taskList/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = taskList.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json("task data with this id not found ");
    }

    res.status(200).json(task);
});

// adding task data

app.post("/addTask", (req, res) => {


    const { task, description } = req.body;

    const newTaskData = {
        id: new Date().getTime(),
        task,
        description,
    };


    taskList.push(newTaskData);

    res.status(201).json({ message: "new task added", newTaskData })

});

// undefined route handling

app.use((req, res, next) => {
    next(new HttpError("requested route not found", 404));
});

// centralize error handling

app.use((error, req, res, next) => {
    if (req.headersSent) {
        next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "internal server error please try again later",
    });
});

const port = 5000;

app.listen(port, () => {
    console.log("server running on port", port);
});