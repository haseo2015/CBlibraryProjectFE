<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-11">
          <h1 class="title">Book List</h1>
        </div>
        <div class="tile">
          <button class="button is-info" @click="$router.push('/add-new-book')">New Book</button>
        </div>
      </div>      
      <div class="field">
        <p class="">
          <input class="input" placeholder="Type your title" v-on:keyup="onKeyUp" v-model="searchString">
        </p>
      </div>
      <div class="columns is-multiline">
        <div class="column is-half is-one-third-desktop"
        v-for="(book, index) of books"
        :key="index">
        <BookCard
          :bookdata="book"
          :onClickButtonDelete="onClickButtonDelete"
        />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BookCard from '../components/BookCard'
export default {
  name: 'Home',
  data: () => ({
    books: null,
    searchString: ''
  }),
  components: {
    BookCard
  },
  methods: {
    onClickButtonView (index) {
      this.$router.push({ name: 'BookDetail', params: {id: index } })
    },
    onClickButtonDelete (index) {
      fetch(`http://localhost:3000/books/delete/${index}`)
      .then(response => response.json())
      .then(data => this.fetchBooks())
      .catch(error => console.warn(error));
    },
    onKeyUp (event) {
      // console.log(event.key)
      console.log(this.searchString)
      console.log(this.books)
      [this.books].filter(book => book.title.includes(this.searchString))
    },
    fetchBooks () {
      fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => this.books = data)
      .catch(error => console.warn('Error while fetch', error));
    }
  },
  created () {
    this.fetchBooks()
  }
}
</script>
