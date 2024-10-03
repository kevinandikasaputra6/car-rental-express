//core module
const os = require("os");

// local module
const luasSegitiga = require("./luasSegitiga.js");

// third party module
// nodemon

const fs = require("fs");

// membuat file menggunakan module fs
fs.writeFileSync("text.txt", "bikin file");

// membaca file menggunakan module fs
const data = fs.readFileSync("text.txt", "utf-8");

console.log(data);
console.log("Kevin Ganteng");
console.log(os.hostname());
console.log(os.freemem());
console.log(os.cpus());
console.log(luasSegitiga(6, 6));
