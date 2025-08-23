const request = require('supertest');
const { expect } = require('chai');

// testes
describe('Transfer External', () => {
  describe('POST /transfer', () => {

    it('Quando informo remetente e destinatário inexistente recebo status 400. External!', async () => {
      const resposta = await request('http://localhost:3000')
        .post('/transfer')
        .send({
          from: "bob",
          to: "la",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });
  });
});