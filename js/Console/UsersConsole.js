/**
 * @file
 * Users console components
 */

import UsersEditorComponent from './UsersEditorComponent.vue';
import UserEditorComponent from './UserEditorComponent.vue';

export let UsersConsole = function(site) {
    const Console = site.console;

    Console.tables.add({
        title: 'Users',
        order: 1,
        api: '/api/users/tables'
    });

    Console.components.addOption({
        atLeast: Users.User.STAFF,
        page: {title: 'Main', route: '', order: 1},
        section: {title: 'Site', order: 1},
        title: 'Users',
        order: 1,
        route: '/users',
        routes: [
            {route: '/users', component: UsersEditorComponent, props: {management: false}}
        ]
    });


    Console.components.addOption({
        atLeast: Users.User.ADMIN,
        page: {title: 'Management', route: '/management', order: 10},
        section: {title: 'Site Management', order: 1},
        title: 'Users',
        order: 1,
        route: '/management/users',
        routes: [
            {route: '/management/users', name: 'users', component: UsersEditorComponent, props: {management: true}},
            {route: '/management/user/:id', name: 'user', component: UserEditorComponent, props: true}
        ]
    });
}


