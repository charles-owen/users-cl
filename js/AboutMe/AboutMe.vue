<template>
  <div class="content cl-about-me">
    <div class="full">
      <mask-vue :mask="mask">Communicating with server...</mask-vue>
      <form method="post" @submit.prevent="submit">
      <table class="small">
        <tr><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr>
        <tr v-for="data in prefData">
          <td>{{data.desc}}</td>
          <td v-if="editing && data.editor !== null" v-html="data.editor"></td>
          <td v-else>{{value(data)}}</td>
          <td>{{data.comment}}</td>
        </tr>
      </table>
        <p v-if="!editing" class="center"><button @click.prevent="edit">Edit</button></p>
        <p v-else class="center"><button type="submit">Submit</button> <button @click.prevent="cancel">Cancel</button></p>
      </form>
    </div>
  </div>
</template>

<script>
  import Dialog from 'dialog-cl';
  import UserVueBase from '../Vue/UserVueBase.vue';

  const MaskVue = Site.MaskVue;

  /// The text preference type
  const TYPE_TEXT = 'text';

  /// The email preference type
  const TYPE_EMAIL = 'email';

  /// A password preference type
  const TYPE_PASSWORD = 'password';

  /**
   * The AboutMe page
   * @constructor AboutMeVue
   */
	export default {
		'extends': UserVueBase,
		props: ['json'],
		data: function() {
			return {
				prefData: [],
				editing: false,
        mask: false
			}
		},
	  components: {
		  maskVue: MaskVue
	  },
    mounted() {
			this.setTitle('About ' + this.user.displayName());
			this.prefData = this.json;
		},
		methods: {
			edit() {
				this.editing = true;
      },
      cancel() {
				this.editing = false;
      },
      submit() {
				let params = {};

				for(let data of this.prefData) {
					if(data.editor === null) {
						continue;
          }

					const element = document.getElementById(data.tag);
					if(element === null) {
						continue;
          }

					const value = element.value;
					params[data.tag] = value;

					if(data.type === TYPE_EMAIL) {
            if(!this.validEmail(value)) {
              new Dialog.MessageBox('Invalid Email!', 'Must provide a valid email address.',
                Dialog.MessageBox.OK, () => {
                });

              return;
            }
          }
        }

          this.mask = true;

          this.$site.api.post('/api/users/aboutme', params)
              .then((response) => {
          	      this.mask = false;
                  if (!response.hasError()) {
                  	this.prefData = response.getData('preferences-data').attributes;
                  	const user = new Site.User(response.getData('user').attributes);
	                  this.$store.commit('user/set', user);
                    this.editing = false;
                  } else {
	                  this.$site.toast(this, response);
                  }

              })
              .catch((error) => {
              	this.mask = false;
	              this.$site.toast(this, error);
              });
      },
      validEmail: function (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      value(data) {
				if(data.type === TYPE_PASSWORD) {
					if(data.value === '' || data.value === null) {
						return '';
          }
					return '********';
        }

				return data.value;
      }
		}
	}
</script>

<style lang="scss">
div.cl-about-me {
  table {
    tr {
      td:nth-child(2) {
        min-width: 195px;
      }
    }
  }
  button {
    width: 7em;
  }

  // Default input width
  input {
    width: 100%;
  }
}
</style>
