<template>
  <div v-if="fetcher.more || fetcher.fetching">
    <div>
      <p class="more" v-if="fetcher.more"><button @click.prevent="fetchMore">MORE</button></p>
      <p class="fetching" v-if="fetcher.fetching">Fetching from server...</p>
    </div>
  </div>
</template>

<script>
  /**
   * @file
   * Fetcher component displays "Fetching" and a "more" button.
   */

  export let Fetcher = function() {
      this.more = false;       // Indicates there is more to fetch
      this.fetching = false;  // Set true while we are fetching
      this.fetched = false;   // Set true when we have fetched something...

      this.start = function(single) {
          this.fetching = true;

          if(single !== true) {
              this.more = false;
          }
      }

      this.done = function(single) {
          this.fetching = false;

          if(single !== true) {
              this.fetched = true;
          }
      }

      this.reset = function() {
          this.more = false;
          this.fetching = false;
          this.fetched = false;
      }
  };


  export default {
      props: [
          'fetcher'
      ],
      methods: {
          fetchMore() {
              this.$parent.fetchMore();
          }
      }
  };

</script>

<style lang="scss" scoped>

  @import '../../../site/sass/modules/_colors';

  div {
    height: 28px;
    margin: 1em 0;

    .more {
      text-align: center;

      button {
        font-size: 0.8em;
        height: 28px;
        margin: 0;
      }
    }

    .fetching {
      text-align: center;
      font-style: italic;
      color: $comp;
      padding-top: 2px;
    }
  }

</style>