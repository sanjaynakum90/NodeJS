import express from "express"

const app = express()

app.get("/", (req, res) => {
    res(200).json("hello from server")
})

app.post("/", (res, req) => { 
    
})

const port = 5000;

app.listen(port, () => {
    console.log("server is listing on port");

})