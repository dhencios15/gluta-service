const { db } = require('../util/admin');
const { getCollectionRef } = require('../util/collectionGetter');

exports.getAllInventory = async (req, res) => {
  try {
    let inventory = [];
    const allInventory = await db.collection('inventory').get();
    allInventory.forEach((doc) => {
      inventory.push({
        productId: doc.id,
        ...doc.data(),
      });
    });
    return res.json(inventory);
  } catch (error) {
    return res.status(400).json({ errors: error.code });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const productRef = await getCollectionRef(
      'inventory',
      req.params.inventId,
      res
    );
    productRef.ref.update({ ...req.body });
    return res.status(200).json({ message: 'Product update success' });
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const productRef = await getCollectionRef(
      'inventory',
      req.params.inventId,
      res
    );
    const stock = {
      productId: productRef.id,
      ...productRef.data(),
    };
    return res.status(200).json(stock);
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};
