import {PageVue} from 'site-cl/js/Vue/PageVue';
import LoginVue from './Login.vue';

let Login = function() {

}

Login.start = function(site) {

    site.ready(() => {
        PageVue.create('div.cl-login', 'Login', LoginVue);
    })

}

Login.start(Site.Site);
