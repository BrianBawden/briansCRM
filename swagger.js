const swaggerAutogen = require("swagger-autogen")()

const doc = {
  info: {
    title: "Brian's CRM",
    description: "A back end for keeping track of customers and employees."
  },
  host: "localhost:8080"
}

const outputFile = "./swagger.json"
const routes = ["./routes/index.js"]

swaggerAutogen(outputFile, routes, doc)