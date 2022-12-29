<template>
  <div class="content">
    <div v-if="json.before !== undefined" v-html="json.before"></div>
    <form class="left" id="login" @submit.prevent="submit" method="post">
      <fieldset>
        <p><label for="userid">User ID</label><br>
          <input type="text" v-model="credentials.id" name="userid" id="userid"></p>
        <p><label for="password">Password</label><br>
          <input type="password" v-model="credentials.password" id="password"></p>
        <p><input id="keep" type="checkbox" v-model="credentials.keep"> <label for="keep">Keep me logged in</label></p>
        <p><input type="submit" value="Login"></p>
        <p class="msg">{{msg}}</p>
      </fieldset>
    </form>
    <div class="left" v-if="json.after !== undefined" v-html="json.after"></div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      credentials: {
        id: '',
        password: '',
        keep: false
      },
      msg: ''
    }
  },
  props: ['json'],
  created: function () {
    this.$site.api.post('/api/users/logout', {})
        .then((response) => {
        })
        .catch((error) => {
        });
  },
  mounted: function () {
    this.redirect = this.$route.query
    if (this.redirect === undefined || this.redirect === null) {
      this.redirect = this.$site.root + '/'
    }
  },
  computed: {
    route() {
      return this.$route
    }
  },
  methods: {
    submit() {
      this.$site.api.post('/api/users/login', this.credentials)
          .then((response) => {
            if (response.hasError()) {
              this.$site.toast(this, response);
            } else {
              window.location = this.redirect;
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
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
