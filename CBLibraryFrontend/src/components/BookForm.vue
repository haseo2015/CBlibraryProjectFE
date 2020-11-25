<template>
  <div class="card">
    <div class="card-content">
      <form id="formData">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" name="title" :value="bookdata ? bookdata.title : ''">
          </div>
        </div>
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input class="input" type="text" placeholder="Text input" name="author" :value="bookdata ? bookdata.author : ''">
          </div>
        </div>
      </form>
    </div>
    <footer class="card-footer is-flex is-justify-content-center">
      <button class="button is-info my-5" @click="onSave">Save</button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'BookForm',
    props: {
      bookdata: {
        type: Object,
        default: {
          title: '',
          author: ''
        }
      },
      onSave: {
        type: Function
      }
    },
  }
</script>
