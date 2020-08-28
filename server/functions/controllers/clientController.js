const { db } = require('../util/admin');
const { addClientValidate } = require('../validations/clientValidation');

exports.getClient = async (req, res) => {
  try {
    const clientRef = await db.doc(`/clients/${req.params.clientId}`).get();
    if (!clientRef.exists)
      return res.status(404).json({ erros: 'Client not found' });

    const client = {
      clientId: clientRef.id,
      ...clientRef.data(),
    };
    return res.status(200).json(client);
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};

exports.getAllClient = async (req, res) => {
  try {
    let clients = [];
    const allclientsRef = await db.collection('clients').get();
    allclientsRef.forEach((doc) => {
      clients.push({
        clientId: doc.id,
        ...doc.data(),
      });
    });
    return res.json(clients);
  } catch (error) {
    return res.status(400).json({ errors: error.code });
  }
};

exports.addClient = async (req, res) => {
  const { errors, isValid } = addClientValidate(req.body);
  if (!isValid) return res.status(400).json(errors);
  try {
    await db
      .collection('clients')
      .add({ ...req.body, history: [], isActive: true });
    return res.status(200).json({ message: 'Client Added' });
  } catch (error) {
    res.status(500).json({ errors: 'Invalid Adding Client' });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientRef = await db.doc(`/clients/${req.params.clientId}`).get();
    if (!clientRef.exists)
      return res.status(404).json({ errors: 'Client not found' });
    clientRef.ref.update({ ...req.body });
    return res.status(200).json({ message: 'Client Update Successfully' });
  } catch (error) {
    return res.status(404).json({ errors: error.code });
  }
};
