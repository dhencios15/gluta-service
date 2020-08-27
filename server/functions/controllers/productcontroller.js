const { db } = require('../util/admin');

const { validateProduct } = require('../validations/productValidation');

exports.getAllProducts = async (req, res) => {
  try {
    let products = [];
    const allProducts = await db.collection('products').get();
    allProducts.forEach((doc) => {
      products.push({
        productId: doc.id,
        ...doc.data(),
      });
    });
    return res.json(products);
  } catch (error) {
    return res.status(400).json({ errors: error.code });
  }
};

exports.addProduct = async (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { title, description, price, quantity } = req.body;
  const newProduct = {
    title,
    description,
    price,
    quantity,
  };

  try {
    await db.collection('products').doc(title).set(newProduct);
    return res.status(200).json({ message: 'Product created' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
