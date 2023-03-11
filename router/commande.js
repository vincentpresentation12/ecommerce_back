const express = require("express");
const {
  updateCommande,
  deleteCommande,
  getAllCommandesByUserId,
  getAllCommandes,
} = require("../controller/commande");
const auth = require("../middleware/auth");

const commandeRouter = express.Router();

commandeRouter.get("/:id", auth, getAllCommandesByUserId);
commandeRouter.get("/", auth, getAllCommandes);
commandeRouter.put("/:id", auth, updateCommande);
commandeRouter.delete("/:id", auth, deleteCommande);

module.exports = commandeRouter;
