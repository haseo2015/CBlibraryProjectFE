<template>
  <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {{bookdata.title}}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
      Author: 
      <span class="has-text-weight-medium">{{bookdata.author}}</span>
      <br>
      created at <time :datetime="formattedDate">{{formattedDate}}</time>
    </div>
  </div>
  <footer class="card-footer">
    <router-link :to="`/book/${bookdata.key}`" class="card-footer-item">Edit</router-link>
    <a @click="onClickButtonDelete(bookdata.key)" class="card-footer-item">Delete</a>
  </footer>
</div>
</template>

<script>
  export default {
    name: 'BookCard',
    props: {
      bookdata: {
        type: Object
      },
      onClickButtonDelete: {
        type: Function
      }
    },
    computed: {
      formattedDate () {
        return new Date(this.bookdata.creation_date).toLocaleDateString('it-IT')
      }
    }
  }
</script>
