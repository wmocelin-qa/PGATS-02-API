// In-memory user and transfer database
const users = [
  {
    username: 'juninho',
    password: '1234', 
    saldo: 10000,
    favorecidos: ['gisele']
  },
  {
    username: 'gisele',
    password: 'senha_qualquer',
    saldo: 5000,
    favorecidos: []
  },
];

const transfers = [];

module.exports = {
  users,
  transfers
};
