const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnection } = require("./dbconfig");
require("dotenv").config();

app.use(cors());
app.use(express.json());

dbConnection();

const PORT = process.env.PORT || 3001;

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

app.use("/task", require("./routes/task"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.listen(PORT, () =>
	console.log("Database connected and server running on port", PORT)
);
