const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../app');
const transferService = require('../../service/transferService')

describe('Transfer Controller', () => {
  describe('POST /transfer', () => {
    let token;

    beforeEach(async () => {
      console.log('Iniciando login para obter o token de teste...');
      const respostaLogin = await request(app)
        .post('/login') // Verifique se a rota é /login ou /users/login
        .send({
          username: 'juninho',
          password: '1234'
        });
      
      token = respostaLogin.body.token;
      console.log('Token obtido com sucesso!', token);
    });

    it('Quando informo remetente e destinatário inexistente recebo status 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: "juninho",
          to: "usuario_inexistente",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });

    it('Usando Mocks: Quando informo remetente e destinatário inexistente recebo status 400', async () => {
    // mocar service    
    const tranferServiceMock = sinon.stub(transferService, 'transfer')
    tranferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'))
    
    const resposta = await request(app)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: "bob",
          to: "la",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });

    it.only('Quando informo valores válidos eu tenho sucesso com 200 CREATED', async () => {
   // Mock para o cenário de sucesso da transferência
    const transferServiceMock = sinon.stub(transferService, 'transfer');
    transferServiceMock.returns({ 
      from: "juninho", 
      to: "gisele", 
      value: 10,
    });

      const resposta = await request(app)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
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

     afterEach(() => {
      sinon.restore();
    });
  });
});
