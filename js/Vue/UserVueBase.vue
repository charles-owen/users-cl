<!--
@file
Base component for pages that includes support for this.user

Provides:
setTitle
this.root
-->

<script>
    export default {
        'extends': Site.Site.PageVueBase,
        computed: {
        	user() {
        		return  this.$store.state.user.user
          }
        }
    }
</script>