const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
    });

    res.status(200).json({
      status: 'success',
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(401).json({
        status: 'Failed',
        message: 'No Product Found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(401).json({
        status: 'Failed',
        message: 'No Product Found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
