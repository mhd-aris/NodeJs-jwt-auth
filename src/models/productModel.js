const getProductModel = (sequelize, { DataTypes }) => {
  const Product = sequelize.define("product", {
    name_product: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.BIGINT,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Product;
};

export default getProductModel;
