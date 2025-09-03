const request = require('supertest');
const { expect } = require('chai');

// testes
describe('Transfer External', () => {
  describe('POST /transfer', () => {
    let token;

    beforeEach(async () => {
      const respostaLogin = await request('http://localhost:3000')
        .post('/login') // Verifique se a rota é /login ou /users/login
        .send({
          username: 'juninho',
          password: '1234'
        });
      
      token = respostaLogin.body.token;
    });

    it('Quando informo remetente e destinatário existentes recebo status 200. External!', async () => {
      // realizar transferência
      const resposta = await request('http://localhost:3000')
        .post('/transfer')
        .set('authorization', `Bearer ${token}`)
        .send({
          from: "juninho",
          to: "gisele",
          value: 10
        });

      /* uma opção de testes usando expect para cada atributo
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('from', 'julio');
      expect(resposta.body).to.have.property('to', 'priscila');
      expect(resposta.body).to.have.property('value', 100);*/

      // usando fixtures
      const respostaEsperada = require('../fixtures/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201CREATED.json');
      delete resposta.body.date;
      delete respostaEsperada.date;
      expect(resposta.body).to.deep.equal(respostaEsperada)
    });

     it('Quando informo remetente e destinatário inexistente recebo status 400. External!', async () => {
      // realizar transferência
      const resposta = await request('http://localhost:3000')
        .post('/transfer')
        .set('authorization', `Bearer ${token}`)
        .send({
          from: "juninho",
          to: "giseele",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });
  });
});