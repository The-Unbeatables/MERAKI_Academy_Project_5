const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

// Import Routers
//EX: const productsRouter = require("./routes/products");

const productRouter = require("./routes/products");

app.use(cors());
app.use(express.json());

// Routes Middleware
//EX: app.use("/products", productsRouter);
app.use('/products',productRouter)

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});