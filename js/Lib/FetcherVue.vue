<template>
  <div>
    <div class="fetching" v-if="delayedFetching">
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

  /**
   * Fetcher function used to update this object.
   * @constructor
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
            'default': null
        },
        fetching: {
            type: Boolean,
            default: false
        }
      },
      watch: {
          'fetcher.fetching': function(to, from) {
              this.setFetching()
          },
          fetching: function(to, from) {
              this.setFetching()
          }
      },
      data: function() {
          return {
              showFetching: false,
              delayedFetching: false,
              timer: null
          }
      },
      mounted() {
          this.setFetching();
      },
      methods: {
          fetchMore() {
              this.$parent.fetchMore();
          },
          setFetching() {
              // Are we currently fetching?
              let showFetching = (this.fetcher !== null && this.fetcher.fetching) || this.fetching;
              if(showFetching && !this.showFetching) {
                  // Fetching is becoming active
                  console.log('fetching going active');
                  this.timer = setTimeout(() => {
                      this.delayedFetching = true;
                  }, 1000)
              } else if(!showFetching && this.showFetching) {
                  console.log('fetching going inactive');
                  clearTimeout(this.timer);
                  this.time = null;
                  this.delayedFetching = false;
              }
              this.showFetching = showFetching;
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