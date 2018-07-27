<template>
  <div class="cl-user-editor content">
    <div class="full">

      <fetcher :fetcher="fetcher"></fetcher>
      <div v-if="!fetcher.fetching">

        <form @submit.prevent="submit" name="user" id="user">
          <input type="hidden" name="new" id="new" value="">
          <fieldset>
            <legend>{{legend}}</legend>
            <p>
              <label>User ID<br>
                <input ref="userid" type="text" v-model="userId" class="short" size="20" maxlength="30"></label>
            </p>
            <p>
              <label class="form_text">Name <span class="small">(last, first)</span><br>
                <input type="text" v-model="name" maxlength="150"></label>
            </p>
            <p>
              <label class="form_text">Email<br>
                <input ref="email" type="email" v-model="email" maxlength="254"></label>
            </p>
            <div class="roles">
              <div class="label"><em>Role:</em></div>
              <div class="options">
                <label v-for="(roleObj, id) in roles"><input v-model="role" name="role" type="radio" :value="id"
                                                             :checked="checked(id)"> {{roleObj.name}}</label>
              </div>
            </div>
            <p>
              <label>Password<br>
                <input ref="password1" type="password" v-model="password1" class="medium" value=""></label></p>
            <p>
              <label class="form_text">Again<br>
                <input type="password" v-model="password2" class="medium" value=""></label></p>
            <p class="center">
              <button>Submit</button>
              <router-link :to="cancel" tag="button">Cancel</router-link>
            </p>
            <p class="error">&nbsp;</p>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import FetcherVue from '../Lib/FetcherVue.vue';
    import {mapState} from 'vuex';

    export default {
        props: ['id'],
        data: function() {
            return {
                cancel: Site.root + '/cl/console/management/users',
                legend: this.id === 'new' ? 'New User' : 'Edit User',
                roles: Users.User.getUserRoles(),

                userId: '',
                name: '',
                email: '',
                role: '',
                password1: '',
                password2: ''
            }
        },
        computed: mapState({
            fetcher: state => state.users.fetcher

        }),
        components: {
            'fetcher': FetcherVue
        },
        mounted() {
            if(this.id === 'new') {
                this.$parent.setTitle(': Add User');
                this.role = Users.User.USER;
                this.$nextTick(() => {
                    this.$refs.userid.select();
                })
            } else {
                this.$parent.setTitle(': User');
                this.$store.dispatch('users/get', {id: this.id})
                    .then((user) => {
                        this.userId = user.userId;
                        this.name = user.name;
                        this.email = user.email;
                        this.role = user.userRole();
                        this.$nextTick(() => {
                            this.$refs.userid.select();
                        })
                    })
                    .catch((msg) => {
                        Site.toast(this, msg);
                        setTimeout(() => {
                            this.$router.push({name: 'users'});
                        }, 3000);
                    })
            }

        },
        methods: {
            checked(role) {
                return role === this.role;
                },
            submit() {
                let data = {
                    userId: this.userId,
                    name: this.name,
                    email: this.email,
                    role: this.role,
                    password1: this.password1,
                    password2: this.password2
                };

                if(this.id !== 'new') {
                    data.id = this.id;
                }

                let path = this.id === 'new' ? 'users/new' : 'users/update';
                this.$store.dispatch(path, data)
                    .then(() => {
                        this.$router.push({name: 'users'});
                    })
                    .catch((response) => {
                    console.log(response);
                        Site.toast(this, response);
                        switch(response.errorCode()) {
                            case Users.MUST_PROVIDE_USERID_OR_EMAIL:
                                this.$refs.userid.focus();
                                break;

                            case Users.PASSWORDS_MUST_MATCH:
                                this.$refs.password1.focus();
                                break;

                            case Users.DUPLICATE_EMAIL:
                                this.$refs.email.focus();
                                break;

                            case Users.DUPLICATE_USER:
                                this.$refs.userid.focus();
                                break;
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
form {
  max-width: 30em;
  margin: 1em auto;
  background-color: #eeeeee;

  p {
    margin: 0.5em 0;
  }

  fieldset {
    padding: 0 2em;
  }

  input {
    width: 100%;
  }

  label {
    font-style: italic;

    input {
      font-style: normal;
    }
  }

  input.short {
    width: 50%;
  }

  input.medium {
    width: 75%;
  }

  button {
    width: 7em;
  }
}

div.roles {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 0 auto;

  div.label {
    flex: 0 1 auto;
    padding: 0 1em 0 0;
  }

  div.options {
    flex: 0 1 auto;

    label {
      display: block;
    }

    input {
      width: auto;
    }
  }
}

</style>