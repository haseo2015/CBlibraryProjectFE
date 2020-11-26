const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");
const db = require("firebase/database");
const logger = require('../../shared');


const firebaseConfig = {
    apiKey: "AIzaSyD8H0H-bZAG5dgNgZ2t-YOXvsb538Xs9Mc",
    authDomain: "mypersonallibrary-4a2c9.firebaseapp.com",
    databaseURL: "https://mypersonallibrary-4a2c9.firebaseio.com",
    projectId: "mypersonallibrary-4a2c9",
    storageBucket: "mypersonallibrary-4a2c9.appspot.com",
    messagingSenderId: "947904269854",
    appId: "1:947904269854:web:8dd1e6ab9c55a752ce280f"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
let booksRef = database.ref('/books/');

router.get('/', async (req, res, next) => {
  const allBooks = await booksRef.once('value')
  .then(snapshot => {
    return snapshot.val() === null 
    ? []
    : Object.entries(snapshot.val()).map(e => Object.assign(e[1], { key: e[0] }))
  });
  // console.log(allBooks)
  res.send(allBooks);
});

router.post('/new', (req, res, next) => {
  let title = req.body.title;
  let author = req.body.author;
  const esito = addNewBook(title, author)
  // res.send(esito ? 'YAY! New book added successfully': 'Ops! Error during creation');
  res.send({ status: res.statusCode, message: 'ok'})
});

router.get('/edit/(:id)', async (req, res, next) => {
  const bookData = await getBook(req.params.id)
  res.send(bookData);
});

router.put('/update/(:id)', (req, res, next) => {
  const bookID = req.params.id;
  const params = req.body;
  const esito = updateBook(bookID, params);
  console.log(esito ? `Updated book ${bookID} successfully` : 'Error during update')
  console.log(res.statusCode, res.statusMessage)
  res.send({ status: res.statusCode, message: 'ok'})
});

router.get('/delete/(:id)', (req, res, next) => {
  const bookID = req.params.id;
  const esito = removeBook(bookID);
  // res.send(esito ? `Delete book data #${bookID}` :  'Error during deletion');
  res.send({ status: res.statusCode, message: 'deleted'})
});

const addNewBook = async (title, author) => {
  const creation_date = new Date().toISOString();
  let esito = false;

  let newBookRef = booksRef.push();
  newBookRef.set({
    title,
    author,
    creation_date
  })
  .then(() => esito = true)
  .catch(error => {
    console.log(error)
  });

  return esito
}

const removeBook = async (id) => {
  let bookToRemove = database.ref('/books/' + id);
  let esito = false
  bookToRemove.remove()
  .then(() => esito = true)
  .catch(error => {
    console.log(error)
  });
  return esito
}

const updateBook = async (id, params) => {
  const creation_date = new Date().toISOString();
  let esito = false
  database.ref('/books/' + id)
  .set({ ...params, creation_date })
  .then(() => eisto = true)
  .catch(error => {
    console.log(error)
  });

  return esito
}

const getBook = async (id) => {
  return await database.ref('/books/' + id)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => console.log(error));
}

let logMessage;

booksRef.on('child_added', (snapshot) => {
  console.log('child_added', snapshot.key, snapshot.val())
  logMessage = `child_added ${snapshot.key}`
  logger.writeLog(logMessage);
})

booksRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val())
  logMessage = `child_changed ${snapshot.key}`
  logger.writeLog(logMessage);
})

booksRef.on('child_removed', (snapshot) => {
  console.log('child_removed', snapshot.key, snapshot.val())
  logMessage = `child_removed ${snapshot.key}`
  logger.writeLog(logMessage);
})

module.exports = router;
