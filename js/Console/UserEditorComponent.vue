<template>
  <div id="user-editor">
    <div class="content"><div class="full">
      <p v-if="fetching" class="centerbox primary center">Fetching from server...</p>
      <div v-if="!fetching">

      <form @submit.prevent="submit" name="user" id="user">
        <input type="hidden" name="new" id="new" value="">
        <fieldset>
          <legend>{{legend}}</legend>
          <p>
            <label>User ID<br>
            <input ref="userid" type="text" v-model="user.userId" class="short" size="20" maxlength="30" ></label>
          </p>
          <p>
            <label class="form_text">Name <span class="small">(last, first)</span><br>
            <input type="text" v-model="user.name" maxlength="150"></label>
          </p>
          <p>
            <label class="form_text">Email<br>
            <input ref="email" type="email" v-model="user.email" maxlength="254" ></label>
          </p>
          <div class="roles">
            <div class="label"><em>Role:</em></div>
            <div class="options">
              <label v-for="(roleObj, id) in roles"><input v-model="role" name="role" type="radio" :value="id" :checked="checked(id)"> {{roleObj.name}}</label>
            </div>
          </div>
          <p>
            <label>Password<br>
            <input ref="password1" type="password" v-model="password1" class="medium" value=""></label></p>
          <p>
            <label class="form_text">Again<br>
            <input type="password" v-model="password2" class="medium" value=""></label></p>
          <p class="center"><button>Submit</button> <router-link :to="cancel" tag="button">Cancel</router-link></p>
          <p class="error">&nbsp;</p>
        </fieldset>
      </form>
      </div></div></div>
  </div>
</template>

<script>

    export default {
        props: ['id'],
        data: function() {
            return {
                cancel: Site.root + 'cl/console/management/users',
                legend: this.id === 'new' ? 'New User' : 'Edit User',
                roles: this.user.getUserRoles(),
                role: this.user.userRole(),
                password1: '',
                password2: '',
                fetching: true
            }
        },
        beforeCreate() {
            this.user = new Users.User();
            this.user.setUserRole(Users.User.USER);
        },
        mounted() {
            if(this.id === 'new') {
                this.$parent.setTitle(Console.title + ': Add User');
                this.fetching = false;
                this.$nextTick(() => {
                    this.$refs.userid.select();
                })
            } else {
                this.$parent.setTitle(Console.title + ': User');
                Site.api.get('/api/users', {id: this.id})
                    .then((response) => {
                        if(!response.hasError()) {
                            const data = response.getData('users');
                            if(data !== null) {
                                if(data.attributes.length < 1) {
                                    Site.toast(this, 'User does not exist');
                                    setTimeout(() => {
                                        this.$router.push({name: 'users'});
                                    }, 3000);
                                } else {
                                    this.user = new Users.User(data.attributes[0]);
                                    this.role = this.user.userRole();
                                    this.fetching = false;
                                    this.$nextTick(() => {
                                        this.$refs.userid.select();
                                    })
                                }
                            }

                        } else {
                            console.log(response);
                            Site.toast(this, response);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        Site.toast(this, error);
                    });
            }

        },
        methods: {
            checked(role) {
                return role === this.user.userRole();
                },
            submit() {
                let data = {
                    userId: this.user.userId,
                    name: this.user.name,
                    email: this.user.email,
                    role: this.role,
                    password1: this.password1,
                    password2: this.password2
                };

                if(this.id !== 'new') {
                    data.id = this.user.id;
                }

                const path = this.id === 'new' ? '/api/users/new' : '/api/users/update';
                Site.api.post(path, data)
                    .then((response) => {
                        if(!response.hasError()) {
                            this.$router.push({name: 'users'});
                        } else {
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
                        }

                    })
                    .catch((error) => {
                        Site.toast(this, error);
                    });
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