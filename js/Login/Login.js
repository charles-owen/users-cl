let Vue = Site.Vue;

import LoginVue from './Login.vue';

let Login = function() {

}

Login.start = function(site) {

    site.ready(() => {

        let template = `<div id="console"><site-header :title="title"></site-header>
<login-vue :before="before" :after="after"/><site-footer></site-footer>
</div>`;

        const Header = Site.info.header.component();
        const Footer = Site.info.footer.component();

        let before, after, element;
        if( (element = document.getElementById('cl-login')) !== null) {
            let info = JSON.parse(element.textContent);
            before = info.before !== undefined ? info.before : '';
            after = info.after !== undefined ? info.after : '';
        }

        element = document.querySelector('div.cl-login');

        new Vue({
            el: element,
            data: {
                title: 'Login',
                before: before,
                after: after
            },
            template: template,
            components: {
                'site-header': Header,
                'site-footer': Footer,
                'login-vue': LoginVue
            }
        })
    })

}

Login.start(Site.Site);
