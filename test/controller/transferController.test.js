const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../app');
const transferService = require('../../service/transferService')

describe('Transfer Controller', () => {
  describe('POST /transfer', () => {
    it('Quando informo remetente e destinatário inexistente recebo status 400', async () => {
      const resposta = await request(app)
        .post('/transfer')
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

    it('Usando Mocks: Quando informo informo valores válidos eu tenho 201 CREATED', async () => {
    // mocar service
    
    const tranferServiceMock = sinon.stub(transferService, 'transfer')
    tranferServiceMock.returns({ 
        from: "julio", 
        to: "priscila", 
        value: 100
    });
    
    const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "julio",
          to: "priscila",
          value: 100
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('from', 'julio');
      expect(resposta.body).to.have.property('to', 'priscila');
      expect(resposta.body).to.have.property('value', 100);
      
      //retorna tudo e volta ao normal para recomeçar o teste
      sinon.restore();

    });
  });
});
