import models from "../models/index.js";

const { User, UserDetail } = models;

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    let users = await User.findOne({
      where: {
        id,
      },
      attributes: ["email", "phone_number"],
      include: [
        {
          model: UserDetail,
        },
      ],
    });
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["email", "phone_number"],
      include: [
        {
          model: UserDetail,
        },
      ],
    });
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { email, phone_number, first_name, last_name, address, gender, image } =
    req.body;
  try {
    // Update email and password in User model
    if (email || phone_number) {
      let user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      user.email = email || user.email;
      user.phone_number = phone_number || user.phone_number;
      await user.save();
    }

    // Update email and password in UserDetail model
    if (first_name || last_name || address || gender || image) {
      let userDetail = await UserDetail.findOne({
        where: {
          userId: req.user.id,
        },
      });
      userDetail.first_name = first_name || userDetail.first_name;
      userDetail.last_name = last_name || userDetail.last_name;
      userDetail.address = address || userDetail.address;
      userDetail.gender = gender || userDetail.gender;
      userDetail.image = image || userDetail.image;

      await userDetail.save();
    }
    let userDetail = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["email", "phone_number"],
      include: [
        {
          model: UserDetail,
        },
      ],
    });

    res.json({ user: userDetail });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

export default {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
