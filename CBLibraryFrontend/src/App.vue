<template>
  <div class="container">
    <Header />
    <router-view :key="$route.fullPath"></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
