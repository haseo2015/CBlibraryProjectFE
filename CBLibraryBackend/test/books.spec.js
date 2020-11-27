const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");
const app = require('../app');
// const firebase = require('../database');
// const database = firebase.database();
// let booksRef = database.ref('/books/');

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

  describe('PUT /update', () => {
    it("should add and edit a book", (done) => {
      const bookData = {
        title: 'My Sample book',
        author: 'My Author'
      }
      let key = ''
      chai.request(app)
      .post('/books/new')
      .send(bookData)
      .end((err, res) => {
        res.should.have.status(200);
        key = res.body.message
      });

      const newbookData = {
        title: 'My Super book ',
        author: 'My Super Author'
      }
      chai.request(app)
      .post(`/books/update/${key}`)
      .send(newbookData)
      .end();

      chai.request(app)
      .get(`/books/edit/${key}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.title.should.be.equal(newbookData.title);
        res.body.author.should.be.equal(newbookData.author);
        done();
      });

    });
  });




});