/**
 * The Vuex store module for users
 */

import {User} from './User.js';


export let StoreModuleUsers = {
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


