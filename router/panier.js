const express = require("express");

const auth = require("../middleware/auth");
const {
  addPanier,
  getAllPanierByUserId,
  deletePanier,
  updatePanier,
  getAllPanier,
} = require("../controller/panier");
const panierRouter = express.Router();

panierRouter.post("/", auth, addPanier);
panierRouter.get("/", auth, getAllPanier);
panierRouter.get("/:id", auth, getAllPanierByUserId);
panierRouter.delete("/:id", auth, deletePanier);
panierRouter.put("/", auth, updatePanier);

module.exports = panierRouter;
