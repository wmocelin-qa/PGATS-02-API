const { users, transfers } = require('../model/userModel');

function transfer({ from, to, value }) {
  if (!from || !to || typeof value !== 'number') {
    const error = new Error('Dados de transferência inválidos');
    error.status = 400;
    throw error;
  }
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    const error = new Error('Usuário remetente ou destinatário não encontrado');
    error.status = 400;
    throw error;
  }
  if (sender.saldo < value) {
    const error = new Error('Saldo insuficiente');
    error.status = 400;
    throw error;
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    const error = new Error('Transferências acima de R$ 5.000,00 só para favorecidos');
    error.status = 400;
    throw error;
  }
  sender.saldo -= value;
  recipient.saldo += value;
  const transferObj = { from, to, value, date: new Date().toISOString() };
  transfers.push(transferObj);
  return transferObj;
}

module.exports = {
  transfer
};
