const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  const { from, to, value } = req.body;
  if (!from || !to || typeof value !== 'number') {
    return res.status(400).json({ error: 'Dados de transferência inválidos' });
  }
  try {
    const result = transferService.transfer({ from, to, value });
    res.json({ message: 'Transferência realizada', ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
