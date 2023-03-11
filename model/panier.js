const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../data/index");

const Panier = sequelize.define("panier", {
  // Model attributes are defined here
  id_user: {
    type: DataTypes.INTEGER,
  },
  id_article: {
    type: DataTypes.INTEGER,
  },
  quantite: {
    type: DataTypes.INTEGER,
  },
  statut: {
    type: DataTypes.STRING,
  },
  valide: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Panier.associate = (models) => {
  Panier.belongsTo(models.user, {
    foreignKey: "id_user",
    as: "user",
  });
};
Panier.associate = (models) => {
  Panier.belongsTo(models.article, {
    foreignKey: "id_article",
    as: "article",
  });
};

module.exports = Panier;
