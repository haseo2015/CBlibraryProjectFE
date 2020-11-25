<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-11">
          <h1 class="title">Book List</h1>
        </div>
        <div class="tile">
          <button class="button is-info ml-1" @click="$router.push('/add-new-book')">New Book</button>
        </div>
      </div>
      <div class="tile is-ancestor my-5">
        <div class="tile is-11">
          <div class="field-body">
            <input class="input" placeholder="Search title or author" v-model="searchString">
          </div>
        </div>
        <div class="tile">
          <div class="field has-addons ml-1">
            <p class="control">
              <button class="button" @click="onClickFilter('asc')">
                <span>A-Z</span>
              </button>
            </p>
            <p class="control" @click="onClickFilter('desc')">
              <button class="button">
                <span>Z-A</span>
              </button>
            </p>
          </div>
        </div>
      </div>





              
      <div class="columns is-multiline">
        <div class="column is-half is-one-third-desktop"
        v-for="(book, index) of filteredBooks"
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
    books: [],
    filteredBooks: [],
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
    onClickFilter (dir) {
      this.filteredBooks = this.filteredBooks.sort((a,b) => {
        return dir === 'desc' 
        ? (a.title.toUpperCase() > b.title.toUpperCase()) ? -1 : 1
        : (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1
      })
    },
    fetchBooks () {
      fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => this.books = this.filteredBooks = data)
      .catch(error => console.warn('Error while fetch', error));
    }
  },
  created () {
    this.fetchBooks()
  },
  watch: {
    searchString () {
      if (this.searchString !== '' && this.searchString.length > 0) {
      this.filteredBooks = this.books.filter(book => (book.title.toLowerCase().includes(this.searchString.toLowerCase()) || book.author.toLowerCase().includes(this.searchString.toLowerCase())))
      // console.log(this.searchString, this.filteredBooks)
      } else {
        this.filteredBooks = this.books
      }
    }
  }
}
</script>
