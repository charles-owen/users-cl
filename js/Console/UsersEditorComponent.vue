<template>
  <div id="users-editor">
    <div class="content users-editor-cl">
      <div class="full">
        <p v-if="fetching" class="centerbox primary center">Fetching from server...</p>
        <div v-if="!fetching">

      <p v-if="management" class="center"><router-link :to="toNew" tag="button">Add User</router-link></p>
      <table >
        <tr>
          <th scope="col">&nbsp;</th>
          <th scope="col">User</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
        </tr>
        <tr v-for="user in users">
          <td v-if="management"><router-link :to="toUser(user)"><img :src="pencil" alt="Edit" title="Edit"></router-link>
          <a href="javascript:" @click.prevent="deleteUser(user)"><img :src="deleter" alt="Delete" title="Delete"></a></td>
          <td v-if="management"><router-link :to="toUser(user)">{{user.userId}}</router-link></td>
          <td v-if="management"><router-link :to="toUser(user)">{{user.name}}</router-link></td>
          <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;"><img :src="info" alt="View" title="View"></a></td>
          <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;">{{user.userId}}</a></td>
          <td v-if="!management"><a @click.prevent="presentUser(user)" href="javascript:;">{{user.name}}</a></td>
          <td>{{user.email}}</td>
          <td>{{user.userRoleName()}}</td>
        </tr>
      </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Dialog from 'dialog-cl';

    export default {
        props: [
            'management'
        ],
        data: function() {
            return {
                toNew: Site.root + 'cl/console/management/user/new',
                pencil: Site.root + 'vendor/cl/site/img/pencil16.png',
                deleter: Site.root + 'vendor/cl/site/img/x.png',
                info: Site.root + 'vendor/cl/site/img/info16.png',
                users: [],
                more: false,
                toUser: function(user) {
                      return Site.root + 'cl/console/management/user/' + user.id;
                },
                fetching: true,
                deleteUser: function(user) {
                    new Dialog.MessageBox('Are you sure?', 'Are you sure you want to delete ' + user.name,
                      Dialog.MessageBox.OKCANCEL, () => {
                            Site.api.post('/api/users/delete', {id: user.id})
                                .then((response) => {
                                    if(!response.hasError()) {
                                        for(let i=0; i<this.users.length;  i++) {
                                            if(this.users[i].id === user.id) {
                                                this.users.splice(i, 1);
                                                break;
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

                        });
                },
                presentUser: function(user) {
                    let content = `<div class="users-editor-cl-dlg">
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
            }
        },

        mounted() {
            this.$parent.setTitle(Console.title + ': Users');

            Site.api.get('/api/users', {})
                .then((response) => {
                    if(!response.hasError()) {
                        const data = response.getData('users');
                        if(data !== null) {
                            this.more = false;
                            data.attributes.forEach((userObj) => {
                                if(userObj.more === true) {
                                    this.more = true;
                                } else {
                                    this.users.push(new Users.User(userObj));
                                }
                            })

                            this.fetching = false;
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
    }
</script>

// Notice: Not scoped!
<style lang="scss">
div.users-editor-cl {

  table {
    font-size: 0.9em;
    margin-top: 1.2em;
    margin-bottom: 1.2em;
  }

  td:first-child {
    text-align: center;
  }
}

div.users-editor-cl-dlg {
  padding: 1em;

  div.tabular {
    display: table;
    margin: 0 auto;

    p {
      display: table-row;

      span:first-child {
        padding-right: 1em;
        font-style: italic;
        text-align: right;
      }

      span {
        display: table-cell;
      }
    }


  }


}

</style>