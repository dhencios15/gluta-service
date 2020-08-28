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

  const { title, description, price, sellPrice } = req.body;
  const newProduct = {
    title,
    description,
    origPrice: price,
  };

  try {
    const productRef = await db.collection('products').add(newProduct);
    const product = {
      productId: productRef.id,
      ...newProduct,
    };

    await db
      .collection('inventory')
      .doc(productRef.id)
      .set({
        ...product,
        sellPrice,
        quantity: 0,
      });

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productRef = await db.doc(`/products/${req.params.productId}`).get();
    if (!productRef.exists)
      return res.status(404).json({ erros: 'Product not found' });

    const product = {
      productId: productRef.id,
      ...productRef.data(),
    };
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productRef = await db.doc(`/products/${req.params.productId}`).get();
    if (!productRef.exists)
      return res.status(404).json({ erros: 'Product not found' });
    productRef.ref.update({ ...req.body });
    return res.status(200).json({ message: 'Product update success' });
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};
