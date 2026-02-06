import express from "express";
import HttpError from "./middleware/HttpError.js";
import checkRoll from "./middleware/checkRoll.js";
import helmet from "helmet";

const app = express();

// application level

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

// external middleware

app.use(helmet());

// route middleware

app.get("/admin", checkRoll, (req, res) => {
    res.status(200).json("admin route working");
});

// undefined routes handling

app.use((req, res, next) => {
    next(new HttpError("requested route not found", 404));
});

// centralize error handling

app.use((error, req, res, next) => {
    if (req.headersSent) {
        next(error);
    }
    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "internal server error" });
});

const port = 5000;

app.listen(port, () => {
    console.log("server listening on port", port);
});