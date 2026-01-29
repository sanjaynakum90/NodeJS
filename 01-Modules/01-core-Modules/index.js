// file system core module

// const fs = require("fs"); // using common js

//  now using es modules

import fs from "fs";

fs.writeFileSync("new.txt", "new file created");

const data = fs.readFileSync("new.txt", "utf-8");

console.log("data", data);
