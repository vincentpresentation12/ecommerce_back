const secret = "ma cle";
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    console.log("no token");
    res.sendStatus(401);
  }
}

module.exports = verifyToken;
