const userService = require('../service/userService');

exports.register = (req, res) => {
  const { username, password, favorecidos } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json({ message: 'Usuário registrado', user: { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const user = userService.authenticateUser(username, password);
    res.json({ message: 'Login realizado com sucesso', user: { username: user.username, favorecidos: user.favorecidos, saldo: user.saldo } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  res.json(userService.listUsers());
};



exports.addFavorecido = (req, res) => {
  const { username, favorecido } = req.body;
  try {
    userService.addFavorecido(username, favorecido);
    res.json({ message: 'Favorecido adicionado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deposit = (req, res) => {
  const { username, value } = req.body;
  try {
    userService.deposit(username, value);
    res.json({ message: 'Depósito realizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
