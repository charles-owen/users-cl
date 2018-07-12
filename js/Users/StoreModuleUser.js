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
        set(state, json) {
            state.user = new User(json);
        }
    }
}


