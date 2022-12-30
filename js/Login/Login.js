import LoginVue from './Login.vue';
import {createRouter, createWebHistory} from 'vue-router'

let Login = function() {

}

Login.start = function(site) {


    site.ready(() => {

        const Empty = { template: '<div></div>' }
        const router = createRouter({
            history: createWebHistory(),  // '/:pathMatch(.*)'
            routes: [{ path: '/:pathMatch(.*)', name: 'any', component: Empty}],
        })

        site.PageVue.create('div.cl-login', 'Login', LoginVue, {router})
    })
}

Login.start(Site.Site);
