<!--
@file
Base component for pages that includes support for this.user

Provides:
setTitle
this.root
-->

<script>
    import PageVueBase from 'site-cl/js/Vue/PageVueBase.vue';

    export default {
        'extends': PageVueBase,
        data: function() {
            return {
                user: this.$store.state.user.user
            }
        }
    }
</script>