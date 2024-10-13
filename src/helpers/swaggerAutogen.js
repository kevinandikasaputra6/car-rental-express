const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Car Rental",
    description: "Car RentalAPI",
  },
  host: "localhost:3000/api/v1",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "../../swagger-output.json";
const routes = ["../../index.js"];

swaggerAutogen(outputFile, routes, doc);
