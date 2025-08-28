const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../app');
const userService = require('../../service/userService');
const transferService = require('../../service/transferService')

describe('Transfer Controller', () => {
  let token;
  describe('POST /transfer', () => {
    beforeEach(async () => {
      const respostaLogin = await request(app)
        .post('/login')
        .send({
          username: 'juninho',
          password: '123'
        });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Quando informo remetente e destinatário inexistente recebo status 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
        .set('authorization', token)
        .send({
          from: "bob",
          to: "la",
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
        .send({
          from: "bob",
          to: "la",
          value: 100
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
      
      //retorna tudo e volta ao normal para recomeçar o teste
      sinon.restore();
    });

    it.only('Quando informo valores válidos eu tenho sucesso com 200 CREATED', async () => {
   // Mock para o cenário de sucesso da transferência
    const tranferServiceMock = sinon.stub(transferService, 'transfer').returns({
      from: "juninho",
      to: "gisele",
      value: 10
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
      console.log(token)
      
      //retorna tudo e volta ao normal para recomeçar o teste
      sinon.restore();

    });
  });
});
