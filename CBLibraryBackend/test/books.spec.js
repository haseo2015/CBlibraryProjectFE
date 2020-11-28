const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Books Router', () => {
  describe ('GET /books', () => {
    it ("should return all books", (done) => {
      chai.request(app)
      .get('/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      })
    });
    });
  });

  describe('GET /edit/(:id)', () => {
    it("should get a single book record", (done) => {
      const id = '-MN4TqSeEg2KeCgEcUxc';
      chai.request(app)
      .get(`/books/edit/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.author.should.be.equal('Rocco hun')
        done();
      });
    })

    it("should get a single book record", (done) => {
      const id = '-MN4TqSeEg2KeCgEcUxc11';
      chai.request(app)
      .get(`/books/edit/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.empty;
        done();
      });
  });

  describe('POST /new', () => {
    it("should add a new book", (done) => {
      const bookData = {
        title: 'test Book',
        author: 'test author'
      }
      chai.request(app)
      .post('/books/new')
      .send(bookData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('string');
        done();
      });
    });
  });
});