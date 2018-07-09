let Vue = Site.Vue;

import LoginVue from './Login.vue';

let Login = function() {

}

Login.start = function(info, site) {

    if(site === undefined) {
        site = Site;
    }

    let template = `<div id="console"><site-header :title="title"></site-header>
<login-vue :before="before" :after="after"/><site-footer></site-footer>
</div>`;

    const Header = Site.header.component();
    const Footer = Site.footer.component();

    let before = info.before !== undefined ? info.before : '';
    let after = info.after !== undefined ? info.after : '';

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
