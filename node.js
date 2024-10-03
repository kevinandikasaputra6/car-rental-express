const http = require("http");
const fs = require("fs");
const url = require("url");

function onRequest(request, response) {
  const data = fs.readFileSync("cars.json", "utf-8");
  const q = url.parse(request.url, true).query;
  const cars = JSON.parse(data);

  const search = q.name ? cars.cars.filter((car) => car.name == q.name) : cars;

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(search));
  response.end();
}

const server = http.createServer(onRequest);

server.listen(3000);
