<template>
  <div class="content">
    <div class="full">
      <form>
        <p class="center">
          <select v-model="qLevel" @change.prevent="query">
            <option value="0">&nbsp;</option>
            <option v-for="level in levels" :value="level.value">{{level.name}}</option>
          </select>
          <label>User: <input type="text" spellcheck="false" v-model="qUser"></label>
          <label>Message: <input type="text" spellcheck="false" v-model="qMessage"></label>
          <button @click.prevent="query">Query</button>
        </p>
      </form>
      <table class="small" v-if="results.length > 0">
        <tr>
          <th>Time</th>
          <th>Sys</th>
          <th>Level</th>
          <th>Message</th>
          <th>User</th>
          <th>Other</th>
        </tr>
        <tr v-for="result of results">
          <td class="small">{{time(result.time)}}</td>
          <td>{{result.channel}}</td>
          <td>{{levelName(result.level)}}</td>
          <td>{{result.message}}</td>
          <td>{{result.name}}</td>
          <td class="small">{{other(result)}}</td>
        </tr>
      </table>
      <p class="center" v-else><em>** empty **</em></p>
      <p v-if="more" class="cl-more"><a v-on:click="getMore">more</a></p>
    </div>
  </div>
</template>

<script>
	const ConsoleComponentBase = Site.ConsoleComponentBase;

	export default {
	  extends: ConsoleComponentBase,
    data: function() {
	  	return {
	  		results: [],
        more: false,
        levels: [],
		    qLevel: 0,    // Query level
        qUser: '',    // Query user
        qMessage: ''  // Query message
      }
    },
	  mounted() {
		  this.$parent.setTitle(': Site Logs');

		  for(const level in this.$site.LogLevels) {
		  	this.levels.push({
           value: level,
           name: this.$site.LogLevels[level]
        });
      }

      this.levels.sort(function(a, b) {
      	return a.level - b.level;
      })

		  this.fetch();



	  },
    methods: {
	  	query() {
	  		// Clear existing results
	  		this.results = [];
	  		this.fetch();
      },
	  	fetch() {
	  		const params = {};

	  		if(this.results.length > 0) {
	  			params.before = this.results[this.results.length-1].time;
        }

        if(+this.qLevel !== 0) {
        	params.level = this.qLevel;
        }

        if(this.qUser.trim() !== '') {
        	params.name = this.qUser.trim();
        }

        if(this.qMessage.trim() !== '') {
        	params.message = this.qMessage.trim();
        }

        this.$site.api.get('/api/site/logs', params)
          .then((response) => {
            if (!response.hasError()) {
              let data = response.getData('site-log');
              if (data !== null) {
                const results = data.attributes.results;
                for(const result of results) {
                	this.results.push(result);
                }

                this.more = data.attributes.more;
              }

            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            console.log(error);
            this.$site.toast(this, error);
          });
      },
      getMore() {
	  		this.fetch();
      },
	    time: function(value) {
		    return this.$site.TimeFormatter.relativeUNIX(value);
	    },
      other: function(result) {
	  		let str = '';
	  		if(result.userid !== null) {
	  			str += result.userid;
        }

        if(result.memberid !== null) {
        	str += '/' + result.userid;
        }

        if(result.jwtdata !== null) {
        	str += '/' + result.jwtdata;
        }

        return str;
      },
      levelName: function(level) {
	  		const levels = this.$site.LogLevels;
	  		if(levels[level] !== undefined) {
	  			return levels[level];
        }

        return 'UNDEFINED';
      }
    }
  }


</script>
