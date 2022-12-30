<template>
  <div class="content cl-users-editor">
    <div class="full">
      <div v-if="fetcher.fetched">
        <table v-if="users.length > 0" class="small">
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">User</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
          <tr v-for="user in users">
            <td v-if="management">
              <router-link :to="toUser(user)"><img :src="pencil" alt="Edit" title="Edit"></router-link>
              <a href="javascript:" @click.prevent="deleteUser(user)"><img :src="deleter" alt="Delete"
                                                                           title="Delete"></a></td>
            <td v-if="management">
              <router-link :to="toUser(user)">{{user.userId}}</router-link>
            </td>
            <td v-if="management">
              <router-link :to="toUser(user)">{{user.name}}</router-link>
            </td>
            <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;"><img :src="info" alt="View"
                                                                                                  title="View"></a></td>
            <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;">{{user.userId}}</a></td>
            <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;">{{user.name}}</a></td>
            <td>{{user.email}}</td>
            <td>{{user.userRoleName()}}</td>
          </tr>
        </table>
        <p v-if="users.length == 0" class="centerbox comp center">
          There are currently no users in the system.</p>
      </div>

      <fetcher :fetcher="fetcher"></fetcher>
    </div>
  </div>
</template>

<script>
    import Dialog from 'dialog-cl';
    import FetcherVue from '../Lib/FetcherVue.vue';

    const mapState = Site.Vuex.mapState;
    const ConsoleComponentBase = Site.ConsoleComponentBase;

    export default {
      'extends': ConsoleComponentBase,
      props: [
            'management'
        ],
        data: function() {
            return {
            	root: Site.root,
                pencil: Site.root + '/vendor/cl/site/img/pencil16.png',
                deleter: Site.root + '/vendor/cl/site/img/x.png',
                info: Site.root + '/vendor/cl/site/img/info16.png',
                toUser: function(user) {
                      return Site.root + '/cl/console/management/user/' + user.id;
                }
            }
        },
        methods: {
            fetchMore() {
                this.$store.dispatch('users/more');
            },
            deleteUser: function(user) {
                new Dialog.MessageBox('Are you sure?', 'Are you sure you want to delete ' + user.name,
                    Dialog.MessageBox.OKCANCEL, () => {
                      this.$store.dispatch('users/delete', {id: user.id});
                    });
            },
            presentUser: function(user) {
                let content = `<div class="cl-dialog">
<div class="tabular">
<p><span class="label">User ID: </span><span>${user.userId}</span></p>
<p><span class="label">Name: </span><span>${user.name}</span></p>
<p><span class="label">Email: </span><span>${user.email}</span></p>
<p><span class="label">Role: </span><span>${user.userRoleName()}</span></p>
</div>
</div>`;
                new Dialog({
                    content: content
                });
            }
        },
        computed: mapState({
          users: state => state.users.users,
         // users: state => state.Site.Users,
            fetcher: state => state.users.fetcher
        }),
        mounted() {
          this.$root.setTitle(': Users');
          this.$store.dispatch('users/fetch');

	        // Add the 'Add User' option to the the nav2 navigation bar
	        if(this.management) {
		        this.addComponent = this.$site.console.components.addNav2Link(this, 'Add User', 5, () => {
			        this.$router.push(Site.root + '/cl/console/management/user/new');
		        });
	        }
        },
      beforeUnmount() {
          this.$site.console.components.removeNav2(this, this.addComponent);
        },
        components: {
            'fetcher': FetcherVue
        }
    }
</script>
