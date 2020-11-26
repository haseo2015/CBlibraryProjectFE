const request = require('supertest');
const express = require('express');
const app = express();
const booksRouter = require('../routes/books');
app.use('/books', booksRouter);

// describe('DELETE /book', function() {
//   it('responds with json message "deleted', function(done) {
//     request(app)
//       .get('/books/delete/-MN3xdmfSwjpZ2nJfgsJ')
//       .expect(200, {
//         status: 200,
//         message: 'deleted'
//       }, done);
//   });
// });

// describe('GET /books', function() {
//   it('responds with json', function(done) {
//     request(app)
//       .get('/books')
//       .expect(200);
//   });
// });

describe('GET /book/:id', function() {
  it('responds with json of book', function(done) {
    request(app)
      .get('/book/edit/-MN4TqSeEg2KeCgEcUxc')
      .expect(200, {
        "author": "Rocco hun",
        "creation_date": "2020-11-26T16:57:26.092Z",
        "title": "My perferct gonzoaaaaa",
        "key": "-MN4TqSeEg2KeCgEcUxc"
      });
  });
});


// describe('POST /book', function() {
//   it('responds with json', function(done) {
//     request(app)
//       .post('/books')
//       .send({title: 'mio libro', author: 'autore1'})
//       .expect(200);
//   });
// });