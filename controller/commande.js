const Commande = require("../model/commande");
const { getAllUserById } = require("./user");
const Panier = require("../model/panier");
const Article = require("../model/article");
const { Sequelize, Op } = require("sequelize");

async function getAllCommandesByUserId(req, res) {
  const commandes = await Commande.findAll({
    where: { id_User: req.user.dataValues.id },
  });
  const id = commandes.map((commande) => commande.id_Article);
  const idArrays = id.map((id) => JSON.parse(id));
  const allIds = idArrays.reduce((acc, val) => acc.concat(val), []);
  const uniqueIds = [...new Set(allIds)];
  const commandesWithArticles = await Promise.all(
    commandes.map(async (commande) => {
      if (commande.id_Article.length > 0) {
        const articles = await Article.findAll({
          where: { id: { [Sequelize.Op.in]: uniqueIds } },
        });
        return { ...commande.dataValues, articles };
      } else {
        return { ...commande.dataValues, articles: [] };
      }
    })
  );

  if (commandesWithArticles.length === 0) {
    return res.json([]);
  }

  res.json(commandesWithArticles);
}

async function getAllCommandes(req, res) {
  if (req.user.dataValues.level === 1) {
    const commandes = await Commande.findAll();
    const id = commandes.map((commande) => commande.id_Article);
    const idArrays = id.map((id) => JSON.parse(id));
    const allIds = idArrays.reduce((acc, val) => acc.concat(val), []);
    const uniqueIds = [...new Set(allIds)];
    const commandesWithArticles = await Promise.all(
      commandes.map(async (commande) => {
        if (commande.id_Article.length > 0) {
          const articles = await Article.findAll({
            where: { id: { [Sequelize.Op.in]: uniqueIds } },
          });
          return { ...commande.dataValues, articles };
        } else {
          return { ...commande.dataValues, articles: [] };
        }
      })
    );

    if (commandesWithArticles.length === 0) {
      return res.json([]);
    }

    res.json(commandesWithArticles);
  } else {
    res.status(403).json({ mess: "Vous n'avez pas les droits" });
  }
}

async function updateCommande(req, res) {
  if (!req.body.status_Admin) {
    res.status(400).json({ mess: "Champs obligatoires : statut" });
    return;
  }
  if (req.user.dataValues.level === 1) {
    const commande = await Commande.findByPk(req.params.id);
    commande.status_Admin = req.body.status_Admin;
    await commande.save({ fields: ["status_Admin"] });
    res.json(commande);
  } else {
    res.status(403).json({ mess: "Vous n'avez pas les droits" });
  }
}

//delete commande by id and delete commande_article by id_commande
async function deleteCommande(req, res) {
  if (req.user.dataValues.level === 1) {
    const commande = await Commande.findByPk(req.params.id);
    const id = JSON.parse(commande.id_Panier);
    await Panier.destroy({
      where: { id: id },
    });
    await Commande.destroy({
      where: { id: req.params.id },
    });

    res.json({ mess: "Commande supprimée" });
  } else {
    res.status(403).json({ mess: "Vous n'avez pas les droits" });
  }
}

module.exports = {
  getAllCommandesByUserId,
  updateCommande,
  deleteCommande,
  getAllCommandes,
};
