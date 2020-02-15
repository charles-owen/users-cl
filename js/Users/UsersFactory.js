/**
 * @file
 * Factory that creates the Users object
 */

import {User} from './User';
import {StoreModuleUser} from './StoreModuleUser';
import {StoreModuleUsers} from '../StoreModuleUsers';
import {Permissions} from './Permissions';
import AboutMeVue from '../AboutMe/AboutMe.vue';
import UserVueBase from '../Vue/UserVueBase.vue';

export const UsersFactory = function() {}

/**
 * Factory method to create a Users object.
 *
 * This allows for injection of the store for testing purposes.
 * @param store Vuex store object
 * @returns {Users} object.
 */
UsersFactory.create = function(site) {

    let Users = function() {
    }

    //
    // Exported components and constants
    //
    Users.MUST_PROVIDE_USERID_OR_EMAIL = 101;
    Users.PASSWORDS_MUST_MATCH = 102;
    Users.DUPLICATE_USER = 103;
    Users.DUPLICATE_EMAIL = 104;


    //
    // Install the users store modules
    //
    let store = site.store;

    if(store !== undefined) {
        store.registerModule('user', StoreModuleUser);
        store.registerModule('users', StoreModuleUsers.create(
            '/api/users',
            (user)=>{ return user.id; }
        ));
    }

    site.ready(() => {
        //
        // Detect the passed in user information
        // and add it to the store.
        //
        let en;
        if( (en = document.getElementById('cl-user')) !== null) {
            store.commit('user/set', JSON.parse(en.textContent));
        }

        // Add permissions array if available
	    if( (en = document.getElementById('cl-permissions')) !== null) {
		    site.permissions = new Permissions(JSON.parse(en.textContent));
	    }

        site.PageVue.create('div.cl-users-aboutme', 'Example Vue', AboutMeVue, site.PageNav);

    });

    site.UserVueBase = UserVueBase;
    site.User = User;
    site.StoreModuleUsers = StoreModuleUsers;

    return Users;
}
