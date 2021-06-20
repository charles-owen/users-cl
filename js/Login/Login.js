import LoginVue from './Login.vue';
let Login = function() {

}

Login.start = function(site) {

    site.ready(() => {
        site.PageVue.create('div.cl-login', 'Login', LoginVue);
    })

}

Login.start(Site.Site);
