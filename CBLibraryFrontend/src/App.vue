<template>
  <main>
  <router-view :key="$route.fullPath"></router-view>
  </main>
</template>
<script>
export default {
  name: 'App'
}
</script>
