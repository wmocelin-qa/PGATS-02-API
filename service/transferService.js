const { users, transfers } = require('../model/userModel');

function transfer({ from, to, value }) {
  if (!from || !to || typeof value !== 'number') {
    throw new Error('Dados de transferência inválidos');
  }
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    throw new Error('Usuário remetente ou destinatário não encontrado');
  }
  if (sender.saldo < value) {
    throw new Error('Saldo insuficiente');
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só para favorecidos');
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
