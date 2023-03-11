const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../data/index");

const Commande = sequelize.define("commande", {
  // Model attributes are defined here
  id_Panier: {
    type: DataTypes.JSON,
  },
  id_User: {
    type: DataTypes.INTEGER,
  },
  id_Article: {
    type: DataTypes.JSON,
  },
  status_Admin: {
    type: DataTypes.STRING,
  },
  status_User: {
    type: DataTypes.STRING,
    defaultValue: "Validé",
  },
});

Commande.associate = (models) => {
  Commande.hasMany(models.panier, {
    foreignKey: "id_commande",
    as: "panier",
    onDelete: "cascade",
  });
};

module.exports = Commande;
