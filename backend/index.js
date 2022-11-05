const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers
//EX: const productsRouter = require("./routes/products");
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login")
const productRouter = require("./routes/products");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const workersRouter = require("./routes/workers");



app.use(cors());
app.use(express.json());

// Routes Middleware
//EX: app.use("/products", productsRouter);
app.use('/products',productRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/roles", rolesRouter)
app.use("/users", usersRouter)






app.use('/workers' , workersRouter)


app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});