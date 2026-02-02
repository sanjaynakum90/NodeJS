import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let StudentList = [
    { id: 1, name: "jordan" },
    { id: 2, name: "smith" }
];

app.get("/", (req, res) => {
    res.render("index", { students: StudentList });
});

app.post("/add-student", (req, res) => {
    const { name } = req.body;

    StudentList.push({
        id: StudentList.length + 1,
        name: name
    });

    res.redirect("/");
});

const port = 5000;
app.listen(port, () => {
    console.log("server running on port", port);
});
