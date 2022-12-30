<template>
  <div></div>
</template>

<script>
  export default {
      props: ['user'],
      data: function() {
          return {
              link: '',
          }
      },
      watch: {
          user: function() {
              // We have a new user, set the links
              let user = this.user;
              let link = this.link;

              if(user !== null && user.prev !== undefined) {
                this.$root.console.components.nav2left = {
                  template: `<router-link title="Previous User" :to="link + user.prev.id"><img :src="icon" alt="Previous User"></router-link>`,
                  data: function() {
                    return {
                      icon: Site.root + '/vendor/cl/site/img/previcon.png',
                      user: user,
                      link: link
                    }
                  }
                }
              } else {
                this.$root.console.components.nav2left = null
              }

              if(user !== null && user.next !== undefined) {
                  this.$root.console.components.nav2right = {
                      template: `<router-link title="Next User" :to="link + user.next.id"><img :src="icon" alt="Next User"></router-link>`,
                      data: function() {
                          return {
                              icon: Site.root + '/vendor/cl/site/img/nexticon.png',
                              user: user,
                              link: link
                          }
                      }
                  }
              } else {
                this.$root.console.components.nav2right = null
              }
          }
      },
      mounted() {
          // Determine the path
          const path = this.$route.path;

          // Remove the user ID from the end
          const re = /(^.*)\/([0-9]+)$/;
          const match = path.match(re);
          if(match !== null) {
              this.link = match[1] + '/';
          }
      },
    beforeUnmount() {
      this.$root.console.components.nav2left = null
      this.$root.console.components.nav2right = null
    }
  }
</script>

