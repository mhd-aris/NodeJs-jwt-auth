import jwt from "jsonwebtoken";
import "dotenv/config";
import models from "../models/index.js";
import bcrypt from "bcrypt";
const { User, UserDetail } = models;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// Register
const register = async (req, res) => {
  const { email, password, phone_number } = req.body;
  try {
    if (!email || !password || !phone_number) {
      throw new Error("all fields must be filled!");
    }
    let user = await User.register(email, password, phone_number);
    await UserDetail.create({ user_id: user.id, userId: user.id });
    const token = generateToken(user.id);

    res.status(200).json({ email, phone_number, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("all fields must be filled!");
    }
    let user = await User.login(email, password);

    const token = generateToken(user.id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

let savedToken = [{}];

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ msg: "Email is required!" });
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "User not found!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    savedToken.push({ id: user.id, token });
    console.log(savedToken);
    res.json({
      url: `reset/${user.id}/${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const reset = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "Invalid link or expired!" });
    }

    let indexToken;
    savedToken.forEach((el, i) => {
      if (el.id == user.id && el.token == token) {
        indexToken = i;
      }
    });
    if (!indexToken) {
      return res.status(400).json({ msg: "Invalid link or expired!" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();
    savedToken.splice(indexToken, 1);
    res.json({ msg: "Password reset success!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export default {
  register,
  login,
  forgotPassword,
  reset,
};
