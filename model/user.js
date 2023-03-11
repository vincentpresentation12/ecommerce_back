const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../data/index");

const User = sequelize.define(
  "utilisateur",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    lastname: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    firstname: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    adresse: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    code_postal: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    city: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
  }
);

User.associate = (models) => {
  User.hasMany(models.commande, {
    foreignKey: "id_user",
    as: "commande",
  });
};

module.exports = User;
