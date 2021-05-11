<template>
  <div class="cl-user-editor content">
    <div class="full">
      <prev-next :user="user"></prev-next>

      <fetcher :fetcher="fetcher"></fetcher>
      <div >
        <form class="cl-common" @submit.prevent="submit">
          <fieldset>
            <legend>{{legend}}</legend>
            <p>
              <label>User ID<br>
                <input ref="userid" type="text" v-model="userId" class="short" size="20" maxlength="30" spellcheck="false"></label>
            </p>
            <p>
              <label class="form_text">Name <span class="small">(last, first)</span><br>
                <input type="text" v-model="name" maxlength="150"></label>
            </p>
            <p>
              <label class="form_text">Email<br>
                <input ref="email" type="email" v-model="email" maxlength="254"></label>
            </p>
            <div class="radio-set">
              <div class="label"><em>Role:</em></div>
              <div class="options">
                <label v-for="(roleObj, id) in roles">
                  <input v-model="role" name="role" type="radio" :value="id">{{roleObj.name}}</label>
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
    import PrevNextUserVue from '../Lib/PrevNextUser.vue';
    import {mapState} from 'vuex';

    export default {
        props: ['id'],
        data: function() {
            return {
                cancel: Site.root + '/cl/console/management/users',
                legend: this.id === 'new' ? 'New User' : 'Edit User',
                roles: Site.User.getUserRoles(),

                user: null,
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
            'fetcher': FetcherVue,
            'prevNext': PrevNextUserVue
        },
        watch: {
          '$route'(to, from) {
              this.take();
          }
        },
        mounted() {
            this.take();
        },
        methods: {
            take() {
                if(this.id === 'new') {
                    this.$parent.setTitle(': Add User');
                    this.role = Site.User.USER;
                    this.$nextTick(() => {
                        this.$refs.userid.select();
                    });
                    this.user = null;
                } else {
                    this.$parent.setTitle(': User');
                    this.$store.dispatch('users/get', {id: this.id})
                        .then((user) => {
                            this.user = user;
                            this.userId = user.userId;
                            this.name = user.name;
                            this.$parent.setTitle(': User ' + user.name);
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
