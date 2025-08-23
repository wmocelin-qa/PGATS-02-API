const transferService = require('../service/transferService');

exports.transfer = async (req, res) => {
  const { from, to, value } = req.body;
  if (!from || !to || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({ error: 'Dados de transferência inválidos' });
  }
  try {
    const result = await transferService.transfer({ from, to, value });
    return res.status(200).json({ message: 'Transferência realizada', ...result });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
  }
};
