const Article = require("../model/article");

async function getAllArticles(req, res) {
  const articles = await Article.findAll();
  res.json(articles);
}
async function getArticleById(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.json(article);
}

async function findArticleById(req, res) {
  const article = await Article.findByPk();
  res.json(article);
}

async function addArticle(req, res) {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.file.fieldname
  ) {
    res
      .status(400)
      .json({ mess: "Champs obligatoires : nom, description, prix et image" });
    return;
  }
  if (req.user.dataValues.level === 1) {
    const { name, description, price } = req.body;

    const article = await Article.create({
      name,
      description,
      price,
      image: req.file.filename,
    });
    res.json(article);
  } else {
    res.status(403).json({ mess: "vous devez être administrateur" });
  }
}

async function updateArticle(req, res) {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res
      .status(400)
      .json({ mess: "Champs obligatoires : nom, description et prix" });
    return;
  }
  if (req.user.dataValues.level === 1) {
    const article = await Article.findByPk(req.params.id);
    article.name = req.body.name;
    article.description = req.body.description;
    article.price = req.body.price;
    if (req.body.image) article.photo = req.body.image;
    article.save();
    res.json(article);
  } else {
    res.status(403).json({ mess: "vous devez etre administrateur" });
  }
}
async function deleteArticle(req, res) {
  if (req.user.dataValues.level === 1) {
    const article = await Article.findByPk(req.params.id);
    article.destroy();
    res.json({ mess: "article supprimé" });
  } else {
    res.status(403).json({ mess: "vous devez etre administrateur" });
  }
}

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
  findArticleById,
};
