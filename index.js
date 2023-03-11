const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { sequelize } = require("./data/index");
const articleRouter = require("./router/article");
const userRouter = require("./router/user");
const panierRouter = require("./router/panier");
const commandeRouter = require("./router/commande");
const verifyToken = require("./middleware/verifyToken");
const app = express();
const port = 3000;

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // autoriser toutes les sources
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // autoriser ces méthodes HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // autoriser ces en-têtes de requête
  next();
});

app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/commande", commandeRouter);
app.use("/api/panier", panierRouter);
app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.name}!`);
});
app.get("/", (req, res) => {
  res.json({ mess: "hello world!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
