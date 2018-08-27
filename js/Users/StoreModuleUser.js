/**
 * @file
 * The Vuex store module that maintains the current system user.
 */

import {User} from './User.js';



export let StoreModuleUser = {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        set(state, user) {
            if(user instanceof User) {
                state.user = user;
            } else {
	            state.user = new User(user);
            }
        }
    }
}


