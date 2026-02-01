
import express from "express";

const app = express();
app.get("/", (req, res) => {
    res.json("hello from server...");
})
app.get("/about", (req, res) => {
    res.json("hello from about....");
})
const port = 5001;
app.listen(port, () => {
    console.log("server running from port", port);
})