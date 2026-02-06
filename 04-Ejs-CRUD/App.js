import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

// View engine setup
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directory setup
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

console.log("filename:", __fileName);
console.log("folder:", __dirName);

// Static files - serve from 'public' directory
app.use(express.static(path.join(__dirName, "public")));

// Student data
let studentList = [
    {
        id: 1,
        name: "jordan",
    },
    {
        id: 2,
        name: "alice",
    },
];

// Routes
app.get("/", (req, res) => {
    res.render("index", { studentList });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).send("Name is required");
    }

    const newStudent = {
        id: Date.now(),
        name: name.trim(),
    };

    studentList.push(newStudent);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid student ID");
    }

    const student = studentList.find((s) => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
        return res.status(400).send("Invalid student ID");
    }

    if (!name || name.trim() === "") {
        return res.status(400).send("Name is required");
    }

    const student = studentList.find((s) => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.name = name.trim();
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid student ID");
    }

    const studentIndex = studentList.findIndex((s) => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).send("Student not found");
    }

    studentList = studentList.filter((s) => s.id !== id);
    res.redirect("/");
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Visit: http://localhost:${port}`);
});