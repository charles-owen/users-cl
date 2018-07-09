<template>
  <div class="content">
    <div v-html="before"></div>
    <form class="left" id="login" @submit.prevent="submit" method="post">
      <fieldset>
        <p><label for="userid">User ID</label><br>
          <input type="text" v-model="credentials.id" id="userid"></p>
        <p><label for="password">Password</label><br>
          <input type="password" v-model="credentials.password" id="password"></p>
        <p><input id="keep" type="checkbox" v-model="credentials.keep"> <label for="keep">Keep me logged in</label></p>
        <p><input type="submit" value="Login"></p>
        <p class="msg">{{msg}}</p>
      </fieldset>
    </form>
    <div class="left" v-html="after"></div>
  </div>

</template>

<script>
    let Vue = Site.Vue;

    let router = new Site.VueRouter({
        mode: 'history',
        routes: []
    });

    module.exports = {
        router,
        data: function() {
            return {
                credentials: {
                    id: '',
                    password: '',
                    keep: false
                },
                msg: ''
            }
        },
        props: {
            before: '',
            after: ''
        },

        created: function() {
            Site.api.post('/api/users/logout', {})
                .then((response) => {
                })
                .catch((error) => {
                });
        },
        mounted: function() {
            this.redirect = this.$route.query.u;
            if(this.redirect === undefined || this.redirect === null) {
                this.redirect = Site.root;
            }
        },
        methods: {
            submit() {
                Site.api.post('/api/users/login', this.credentials)
                    .then((response) => {
                      if(response.hasError()) {
                          Site.toast(this, response);
                      } else {
                          window.location = this.redirect;
                      }

                    })
                    .catch((error) => {
                        Site.toast(this, error);
                    });
            }
        }
    }
</script>

<style lang="scss">
@import '../../../site/sass/modules/_colors';

#login {

  fieldset {
    width: 18em;
    margin: 1em auto;
    color: white;
    background-color: $primary;
    border: thin solid black;
    @extend %shadow;
  }

  #userid, #password {
    width: 16em;
  }

  input {
    color: black;
  }

  .msg {
    text-align: center;
    color: #ccc;
    font-style: italic;
    font-size: 0.9em;
    display: none;
  }

  p {
    margin: 1em 0;
  }
}
</style>
