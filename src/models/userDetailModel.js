const getUserDetailModel = (sequelize, { DataTypes }) => {
  const UserDetail = sequelize.define("userdetail", {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  return UserDetail;
};

export default getUserDetailModel;
