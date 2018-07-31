<template>
  <div>
    <div class="fetching" v-if="(fetcher !== null && fetcher.fetching) || fetching">
      <p>Fetching from server...</p>
    </div>
    <slot v-if="(fetcher === null || !fetcher.fetching) && !fetching"></slot>
    <p class="more" v-if="fetcher !== null && fetcher.more"><button @click.prevent="fetchMore">MORE</button></p>
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
      props: {
        fetcher: {
            type: Object,
            default: null
        },
        fetching: {
            type: Boolean,
            default: false
        }
      },
      methods: {
          fetchMore() {
              this.$parent.fetchMore();
          }
      }
  };

</script>

<style lang="scss" scoped>

@import '../../../site/sass/modules/_colors';

div.fetching {
  height: 28px;
  margin: 1em 0;

  p {
    text-align: center;
    font-style: italic;
    color: $comp;
    padding-top: 2px;
  }
}

.more {
  text-align: center;

  button {
    font-size: 0.8em;
    height: 28px;
    margin: 0;
  }
}

</style>