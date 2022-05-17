const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");
const commentaireRoute = require("./routes/commentaireRoute.js");
const postRoute = require("./routes/postRoute.js");
const userRoute = require("./routes/userRoute.js");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers

app.use("/api/auth", userRoute);
app.use("/api/commentaire", commentaireRoute);
app.use("/api/post", postRoute);

// testing api

app.get("/", (req, res) => {
  res.json({ message: "API connecté" });
});

// port

const PORT = process.env.PORT || 3000;

// Server

app.listen(PORT, () => {
  console.log(`Le serveur ecoute sur le port ${PORT}`);
});
