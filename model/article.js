const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../data/index");

const Article = sequelize.define("article", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  description: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.INTEGER,
    // allowNull defaults to true
  },
  image: {
    type: DataTypes.STRING,
  },
});

Article.associate = (models) => {
  Article.hasMany(models.panier, {
    foreignKey: "id_article",
    as: "panier",
    onDelete: "cascade",
  });
};

module.exports = Article;
