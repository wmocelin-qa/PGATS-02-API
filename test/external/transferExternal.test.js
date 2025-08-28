const request = require('supertest');
const { expect } = require('chai');

// testes
describe('Transfer External', () => {
  describe('POST /transfer', () => {
    let token;
    beforeEach(async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: 'juninho',
                    password: '1234'
                });

            token = respostaLogin.body.token;
        });


    it('Quando informo remetente e destinatário inexistente recebo status 400. External!', async () => {
      const resposta = await request('http://localhost:3000')
        .post('/transfer')
        .set('authorization', `Bearer ${token}`)
        .send({
          from: "juninho",
          to: "gisele",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
      console.log(token)
    });

      it('Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "juninho",
                    to: "gisele",
                    value: 10
                });

            expect(resposta.status).to.equal(200);
        });
  });
});