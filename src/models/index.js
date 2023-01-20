import Sequelize from "sequelize";

import getUserModel from "./userModel.js";
import getUserDetailModel from "./userDetailModel.js";
import getProductModel from "./productModel.js";

const sequelize = new Sequelize(process.env.DB_URI);

const UserDetail = getUserDetailModel(sequelize, Sequelize);
const User = getUserModel(sequelize, Sequelize);
const Product = getProductModel(sequelize, Sequelize);

// User and UserDetail Relation
User.hasOne(UserDetail, {
  foreignKey: "userId",
});
UserDetail.belongsTo(User);

//User and Product Relationa
User.hasMany(Product, {
  foreignKey: "userId",
});
Product.belongsTo(User);

const models = {
  User,
  UserDetail,
  Product,
};

export { sequelize };

export default models;
