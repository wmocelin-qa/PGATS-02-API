const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');

describe('Transfer Controller', () => {
  describe('POST /transfer', () => {
    it('Quando informo remetente e destinatário inexistente recebo status 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "bb",
          to: "la",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });
  });
});
