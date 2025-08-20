const { users } = require('../model/userModel');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, favorecidos = [] }) {
  if (findUserByUsername(username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, favorecidos, saldo: 0 };
  users.push(user);
  return user;
}

function authenticateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    throw new Error('Credenciais inválidas');
  }
  return user;
}

function listUsers() {
  return users.map(({ password, ...rest }) => rest);
}



function addFavorecido(username, favorecido) {
  const user = findUserByUsername(username);
  if (!user) throw new Error('Usuário não encontrado');
  if (!user.favorecidos.includes(favorecido)) {
    user.favorecidos.push(favorecido);
  }
}

function deposit(username, value) {
  const user = findUserByUsername(username);
  if (!user) throw new Error('Usuário não encontrado');
  user.saldo += value;
}

module.exports = {
  findUserByUsername,
  registerUser,
  authenticateUser,
  listUsers,
  // transfer removido, agora está em transferService
  addFavorecido,
  deposit
};
