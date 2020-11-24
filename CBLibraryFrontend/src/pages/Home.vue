<template>
    <div>
        <h1>Book List</h1>
        <ul>
          <li
          v-for="(book, index) in books"
          :key="index">
          {{index}} - {{ book}}
          <button @click="onClickButtonView(index)">View</button>
          <button @click="onClickButtonDelete(index)">Delete</button>

          </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    books: null
  }),
  methods: {
    onClickButtonView (index) {
      this.$router.push({ name: 'BookDetail', params: {id: index } })
    },
    onClickButtonDelete (index) {
      console.log('delete book', index)
    }
  },
  beforeCreate () {
    console.log('component created')
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => this.books = data);
  }
}
</script>
