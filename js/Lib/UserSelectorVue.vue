<!--
/**
 * @file
 * Simple component for selecting a user in the system.
 */
-->
<template>
  <span>
    <div class="cl-input"><input v-model="query" type="text" maxlength="150">
      <a @click.prevent="fetch(query)" class="searcher"><img :src="searcher"></a>
      <div v-if="result.length > 0 || noresult" class="cl-results">
        <div class="cl-result-list">
          <div v-for="user in result" @click.prevent="selectUser(user)"><span><a
            @click.prevent="selectUser(user)">{{user.userId}}</a></span>
            <span><a @click.prevent="selectUser(user)">{{user.name}}</a></span></div>
        </div>

        <div v-if="noresult" class="statement">No results...</div>
        <div v-if="more" class="statement">...more...</div>

      </div>
    </div> <a @click.prevent="clear"><img :src="deleter"></a>
  </span>
</template>

<script>

  const LIMIT = 20;

    export default {
        props: [
            'selected'
        ],
        data: function() {
            return {
                query: '',
                result: [],
                noresult: false,
                seq: 1,
                fetched: false,
                timer: null,
                set: false,
                more: false,
                searcher: Site.root + 'vendor/cl/site/img/search.png',
                deleter: Site.root + 'vendor/cl/site/img/x.png',
            }
        },
        watch: {
            query(after, before) {
                if(this.set) {
                    this.set = false;
                    return;
                }

                if(this.timer !== null) {
                    clearTimeout(this.timer);
                    this.timer = null;
                };

                this.timer = setTimeout(() => {
                    this.fetch(after);
                }, 300);
            }
        },
        methods: {
            fetch(query) {
                console.log('fetch');
                console.log(query);
                if(this.timer !== null) {
                    clearTimeout(this.timer);
                    this.timer = null;
                };

                this.selected(null);

                query = query.trim();
                if(query.length < 2) {
                    this.fetched = false;
                    this.result = [];
                    return;
                }

                this.seq++;
                Site.api.get('/api/users', {search: query, seq: this.seq, limit: LIMIT})
                    .then((response) => {
                        if(!response.hasError()) {
                            // This protects from out-of-order processing
                            // of results from the server...
                            const seq = response.getData('seq');
                            if(+seq.id !== this.seq) {
                                return;
                            }

                            const data = response.getData('users');
                            if(data !== null) {
                                this.result = [];
                                this.more = false;
                                data.attributes.forEach((userData) => {
                                    if(userData.more !== 'yes') {
                                        let user = new Users.User(userData);
                                        this.result.push(user);
                                    } else {
                                        this.more = true;
                                    }
                                })

                                this.noresult = (this.result.length === 0);
                            }

                        } else {
                            Site.toast(this, response);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        Site.toast(this, error);
                    });
            },
            selectUser(user) {;
                this.query = user.name;
                this.set = true;
                this.result = [];
                this.noresult = false;
                this.more = false;
                this.selected(user);
            },
            clear() {
                this.seq++; // Just in case
                this.result = [];
                this.noresult = false;
                this.more = false;
                this.query = '';
                this.selected(null);
            }
        }
    }

</script>

<style lang="scss" scoped>

  a.searcher {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    min-height: 100%;
    width: 21px;
    text-align: center;
    background: #aaaaaa;

    img {
      height: 16px;
      width: 16px;
      vertical-align: -4px;
    }
  }

  div.cl-input {
    display: inline-block;
    position: relative;
    width: 300px;


    input {
      width: 100%;
      border: 1px solid #cccccc;
    }

    div.cl-results {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      overflow: hidden;
      font-size: 0.85em;

      background: white;
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-bottom: 1px solid black;

      div.cl-result-list {
        display: table;
        width: 100%;


        div {
          display: table-row;
          border-bottom: 1px solid #888888;
          cursor: pointer;

          span {
            display: table-cell;
            white-space: nowrap;
            text-align: left;
            padding: 0.5em 0.25em;

            a {
              text-decoration: none;
              color: black;
            }

            a:hover {
              color: #888888;
            }
          }

          span:first-child {
            font-style: italic;
          }

          span:last-child {
            overflow: hidden;
            width: 99%;

          }
        }



        div:first-child, div:last-child {
          span {
            padding: 0.25em 0.25em;
          }
        }
      }


      div.statement {
          width: 100%;
          text-align: center;
        font-style: italic;
      }
    }
  }

</style>