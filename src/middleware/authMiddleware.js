import jwt from "jsonwebtoken";
import models from "../models/index.js";
const { User } = models;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = await User.findByPk(decoded.id);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized!" });
  }
};

export default requireAuth;
