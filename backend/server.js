const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
const path = require("path");
app.use("/api/users", userRoutes);

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Puerto
const PORT = process.env.PORT || 3000;

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB conectado");

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
})
.catch((error) => {
  console.log(error);
});