const Panier = require("../model/panier");
const Article = require("../model/article");
const Commande = require("../model/commande");

async function getAllPanierByUserId(req, res) {
  const panier = await Panier.findAll({
    where: { id_user: req.user.dataValues.id, valide: false },
  });
  const panierWithArticle = await Promise.all(
    panier.map(async (panier) => {
      const article = await Article.findByPk(panier.id_article);
      return { ...panier.dataValues, article };
    })
  );
  res.json(panierWithArticle);
}

async function getAllPanier(req, res) {
  const panier = await Panier.findAll({
    where: { valide: false },
  });
  res.json(panier);
}

async function addPanier(req, res) {
  if (!req.body.id_article) {
    res.status(400).json({ mess: "Champs obligatoires : id_article" });
    return;
  }
  const panier = await Panier.create({
    id_user: req.user.dataValues.id,
    id_article: req.body.id_article,
    quantite: req.body.quantite,
    statut: "en cours",
  });
  res.json(panier);
}

async function updatePanier(req, res) {
  if (!req.body.statut || !req.body.id) {
    res.status(400).json({ mess: "Champs obligatoires : statut" });
    return;
  }
  const panier = await Panier.findAll({
    where: { id_user: req.user.dataValues.id, valide: false },
  });
  const id = [...req.body.id];
  for (let i = 0; i < panier.length; i++) {
    for (let j = 0; j < id.length; j++) {
      if (panier[i].id === id[j]) {
        panier[i].statut = req.body.statut;
        panier[i].valide = true;
        await panier[i].save();
      }
    }
  }
  if (req.body.statut === "validé" && panier) {
    const id_article = panier.map((panier) => panier.id_article);
    if (id_article.length > 0) {
      await Commande.create({
        id_Panier: id,
        id_Article: id_article,
        id_User: req.user.dataValues.id,
        status_Admin: "en Attente",
        statut_User: panier[0].statut,
      });
    } else {
      res.status(400).json({ mess: "Panier vide" });
    }
  } else {
    res.status(400).json({ mess: "Panier vide" });
  }
  res.json(panier);
}

async function deletePanier(req, res) {
  await Panier.destroy({
    where: { id: req.params.id },
  });
  res.json({ mess: "Panier supprimé" });
}

module.exports = {
  addPanier,
  updatePanier,
  deletePanier,
  getAllPanierByUserId,
  getAllPanier,
};
