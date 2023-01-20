import models from "../models/index.js";
const { Product } = models;

// Get all products
const getProduct = async (req, res) => {
  try {
    let product = await Product.findAll({
      attributes: [
        "id",
        "name_product",
        "price",
        "description",
        "image",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

//Get single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "name_product",
        "price",
        "description",
        "image",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  const { name_product, description, price, image } = req.body;
  try {
    if (!req.user.id) {
      throw new Error("Authorization token required!");
    }
    if (!name_product || !description || !price || !image) {
      throw new Error("all fields must be filled!");
    }
    let product = await Product.create({
      name_product,
      description,
      price,
      image,
      userId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { name_product, description, price, image, id } = req.body;

  try {
    if (name_product || description || price || image) {
      console.log(name_product, description, price, image);
      let product = await Product.findOne({
        where: {
          id: id,
        },
      });
      console.log(product);
      if (product) {
        product.name_product = name_product || product.name_product;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product = await product.save();
        console.log(product);
        res.json({ product });
      } else {
        res.status(400).json({ msg: "Invalid product attribut!" });
      }
    } else {
      res.status(400).json({ msg: "Invalid product attribut!" });
    }
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await Product.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: "Product deleted!" });
  } catch (error) {
    console.log(error);
    res.json(400).json({ msg: error.message });
  }
};

export default {
  getProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
