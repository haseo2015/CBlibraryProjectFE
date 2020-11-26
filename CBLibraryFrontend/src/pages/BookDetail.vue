<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Edit book <router-link to="/"><span class="icon icon big">⬏</span></router-link></h1>
      
      <h2 class="subtitle"></h2>
      <BookForm
        :bookdata="bookdata"
        :onSave="onClickSave" />
    </div>
  </section>
</template>

<script>
import BookForm from '../components/BookForm'
export default {
  name: 'BookDetail',
  data: () => ({
    bookdata: {}
  }),
  components: {
    BookForm
  },
  methods: {
    onClickSave () {
      const form = document.querySelector('#formData')
      const data = new URLSearchParams(new FormData(form));
      const api_url = this.$route.params.id 
        ? `http://localhost:3000/books/update/${this.$route.params.id}`
        : `http://localhost:3000/books/new`
      const action =  this.$route.params.id ? 'edit' : 'create';


      fetch(api_url, {
        method: this.$route.params.id ? 'PUT' : 'POST',
        body: data
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) this.$router.push('/')
      })
      .catch(error => alert(`Error while ${action} post: ${error.message}`));
    },
  },
  beforeCreate () {
    if (this.$route.params.id) {
      fetch(`http://localhost:3000/books/edit/${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => this.bookdata = data)
        .catch(error => alert(`Error while fetch post`));
    }
  }
}
</script>
