const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const saltPassword = 10;
    const hashPassword = await bcrypt.hash(password, saltPassword);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

const createToken = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, "souvikjash123dsfjsdfbds", {
      expiresIn: "12h",
    });
    return token;
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

//password compare and check apipage
const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

// const authCheck = (req, res, next) => {
//   console.log("auth middleware");
//   next();
// };
// next is a middleware

const authCheck = (req, res, next) => {
  const token =req.body.token || req.query.token || req.headers["x-access-token"];
if (!token) {
  return res.status(403).send({ "status": false, "message": "A token is required for authentication" });
}
try {
  const decoded = jwt.verify(token, "souvikjash123dsfjsdfbds");
  req.user = decoded;
  console.log(req.user);
} catch (err) {
  return res.status(401).send({ "status": false, "message": "invalid Token Access" });
}
return next();
}

module.exports = {
  hashPassword,
  createToken,
  comparePassword,
  authCheck,
};
