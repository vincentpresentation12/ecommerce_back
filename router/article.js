const express = require("express");
const {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/article");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const articleRouter = express.Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", auth, upload.single("image"), addArticle);
articleRouter.put("/:id", auth, updateArticle);
articleRouter.delete("/:id", auth, deleteArticle);

module.exports = articleRouter;
