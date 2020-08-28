const { db } = require('./admin');

exports.getCollectionRef = async (collection, id, res) => {
  try {
    const dataRef = await db.doc(`/${collection}/${id}`).get();
    if (!dataRef.exists) {
      return res.status(404).json({ erros: `${collection} not found` });
    } else {
      return dataRef;
    }
  } catch (error) {
    return res.status(400).json({ errors: error.code });
  }
};
