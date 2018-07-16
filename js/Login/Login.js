let Vue = Site.Vue;

import LoginVue from './Login.vue';

let Login = function() {

}

Login.start = function(site) {

    if(site === undefined) {
        site = Site;
    }

    let template = `<div id="console"><site-header :title="title"></site-header>
<login-vue :before="before" :after="after"/><site-footer></site-footer>
</div>`;

    const Header = Site.header.component();
    const Footer = Site.footer.component();

    let before, after, en;
    if( (en = document.getElementById('cl-login')) !== null) {
        let info = JSON.parse(en.textContent);
        before = info.before !== undefined ? info.before : '';
        after = info.after !== undefined ? info.after : '';
    }

    new Vue({
        el: '#login',
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
}

export default Login;
