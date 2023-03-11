const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function getAllUser(req, res) {
  const users = await User.findAll();
  res.json(users);
}
async function getAllUserById(id) {
  const user = await User.findOne({ where: { id: id } });
  return user;
}
async function addUser(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ mess: "Champs obligatoires : email et pass" });
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hashedPassword,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    adresse: req.body.adresse,
    code_postal: req.body.code_postal,
    city: req.body.city,
  });
  res.json(user);
}
async function connectUser(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ mess: "Champs obligatoires : email et pass" });
    return;
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    res.status(403).json({ mess: "utilisateur ou mot de passe incorrect" });
    return;
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    res.status(403).json({ mess: "utilisateur ou mot de passe incorrect" });
    return;
  }
  var token = jwt.sign({ ...user }, "ma cle");
  res.json({ token });
}

function Me(req, res) {
  const user = {
    id: req.user.dataValues.id,
    email: req.user.dataValues.email,
    firstname: req.user.dataValues.firstname,
    lastname: req.user.dataValues.lastname,
    adresse: req.user.dataValues.adresse,
    code_postal: req.user.dataValues.code_postal,
    city: req.user.dataValues.city,
    level: req.user.dataValues.level,
  };
  res.json(user);
}

function logout(req, res) {
  const token = null;
  res.json({ token });
}

async function updatePassword(req, res) {
  if (!req.body.password || !req.body.newPassword) {
    res
      .status(400)
      .json({ mess: "Champs obligatoires : password et newPassword" });
    return;
  }
  const user = await User.findOne({ where: { id: req.user.dataValues.id } });
  if (!user) {
    res.status(403).json({ mess: "utilisateur ou mot de passe incorrect" });
    return;
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    res.status(403).json({ mess: "utilisateur ou mot de passe incorrect" });
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.password = hashedPassword;
  user.save();
  res.json(user);
}

async function updateProfil(req, res) {
  if (
    !req.body.lastname ||
    !req.body.firstname ||
    !req.body.adresse ||
    !req.body.code_postal ||
    !req.body.city
  ) {
    res.status(400).json({
      mess: "Champs obligatoires : lastname, firstname, adresse, code_postal, city",
    });
    return;
  }
  const user = await User.findOne({ where: { id: req.user.dataValues.id } });
  if (!user) {
    res.status(403).json({ mess: "utilisateur ou mot de passe incorrect" });
    return;
  }
  user.email = req.body.email;
  user.lastname = req.body.lastname;
  user.firstname = req.body.firstname;
  user.adresse = req.body.adresse;
  user.code_postal = req.body.code_postal;
  user.city = req.body.city;
  user.save();
  res.json(user);
}

module.exports = {
  getAllUser,
  addUser,
  connectUser,
  Me,
  logout,
  getAllUserById,
  updatePassword,
  updateProfil,
};
