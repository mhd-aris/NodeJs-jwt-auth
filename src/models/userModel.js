import { Op } from "sequelize";
import bcrypt from "bcrypt";

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email already registered!",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email not valid!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required!",
        },
      },
    },
    phone_number: {
      type: DataTypes.BIGINT,
      unique: {
        args: true,
        msg: "Phone number already registered!",
      },
      validate: {
        isNumeric: {
          args: true,
          msg: "Phone number must number!",
        },
        notEmpty: {
          args: true,
          msg: "Phone number is required!",
        },
      },
    },
  });

  // User register
  User.register = async (email, password, phone_number) => {
    let exist = await User.findOne({
      where: {
        [Op.or]: [{ email, phone_number }],
      },
    });
    if (exist) {
      throw new Error("email or phone number already used!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.create({
      email,
      password: hashedPassword,
      phone_number,
    });

    console.log(user);
    return user;
  };

  // User login
  User.login = async (email, password) => {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error("Incorrect email!");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password!");
    }
    return user;
  };

  return User;
};

export default getUserModel;
