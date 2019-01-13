<template>
  <div class="content">
    <div class="full">
      <table>
        <tr>
          <th>Time</th>
          <th>Sys</th>
          <th>Level</th>
          <th>Message</th>
          <th>User</th>
          <th>Other</th>
        </tr>
        <tr v-for="result of results">
          <td>{{time(result.time)}}</td>
          <td>{{result.channel}}</td>
          <td>{{level(result.level)}}</td>
          <td>{{result.message}}</td>
          <td>{{result.name}}</td>
          <td class="small">{{other(result)}}</td>
        </tr>
      </table>
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
        more: false
      }
    },
	  mounted() {
		  this.$parent.setTitle(': Site Logs');

		  this.fetch();



	  },
    methods: {
	  	fetch() {
	  		const params = {};

	  		if(this.results.length > 0) {
	  			params.before = this.results[this.results.length-1].time;
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
      level: function(level) {
	  		switch(+level) {
            case 100:
            	return 'DEBUG';

            case 200:
            	return 'INFO';

            case 250:
            	return 'NOTICE';

            case 300:
            	return 'WARNING';

            case 400:
            	return 'ERROR'

            case 500:
            	return 'CRITICAL';

            case 550:
            	return 'ALERT';

            case 600:
            	return 'EMERGENCY';

            default:
            	return level;
        }
      }
    }
  }


</script>
