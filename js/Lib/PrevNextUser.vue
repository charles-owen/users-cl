<template>
  <div class="cl-prevnext">
    <div v-if="user !== null && user.prev !== undefined" class="prev"><router-link :to="this.link + user.prev.id">Previous User</router-link></div>
    <slot></slot>
    <div v-if="user !== null && user.next !== undefined" class="next"><router-link :to="this.link + user.next.id">Next User</router-link></div>
  </div>
</template>

<script>
  export default {
      props: ['link', 'user'],
  }
</script>
