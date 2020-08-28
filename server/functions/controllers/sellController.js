const { db, admin } = require('../util/admin');

exports.sellProduct = async (req, res) => {
  const { products, amount, clientId } = req.body;
  const totalPrice = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  try {
    const sales = {
      total: totalPrice,
      createdAt: new Date().toISOString(),
      clientId,
      client_paid: amount,
      isPaid: totalPrice === amount,
      products,
    };

    const saleRef = await db.collection('sales').add(sales);
    const clientRef = db.doc(`/clients/${clientId}`);

    await products.map((p) => {
      db.doc(`/inventory/${p.productId}`)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            return res.status(404).json({ error: 'Product not found' });
          }
          return doc.ref.update({ quantity: doc.data().quantity - p.quantity });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: 'Something went wrong' });
        });
    });

    await clientRef.get().then((doc) => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Client not found' });

      return doc.ref.update({
        history: admin.firestore.FieldValue.arrayUnion(saleRef.id),
      });
    });

    return res.status(200).json(`Transact success with ref# ${saleRef.id}`);
  } catch (error) {
    return res.status(400).json({ errors: 'Transaction Failed' });
  }
};
