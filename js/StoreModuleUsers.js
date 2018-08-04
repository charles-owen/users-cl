/**
 * @file
 * Vuex store module that maintains a collection of system users.
 */

import {Fetcher} from './Lib/FetcherVue.vue';
import {User} from './Users/User.js';

const LIMIT = 500;

export let StoreModuleUsers = function() {
}

/**
 * Create a Vuex store module to store users.
 *
 * This will work for both Users and course Members, since they
 * use the same API.
 * @param api '/api/users' for '/api/course/members'
 * @param query Items to add to the query (semester and section for members).
 * @param toId Mapping from a user to the ID to use for the collection.
 * @returns {*}
 */
StoreModuleUsers.create = function(api, toId) {
    return {
        namespaced: true,
        state: {
            users: [],
            fetcher: new Fetcher(),     // Indicates the fetching status
            query: {}
        },
        mutations: {
            add(state, user) {
                state.users.push(user);
            },
            more(state, value) {
                state.fetcher.more = value;
            },
            fetchStart(state, value) {
                state.fetcher.start(value);
            },
            fetchDone(state, value) {
                state.fetcher.done(value);
            },
            reset(state, value) {
                state.fetcher.reset();
                state.users = [];
            },
            query(state, value){
                state.query = value;
            },
            update(state, user) {
                // If nothing is fetched, nothing need be updated
                if(!state.fetcher.fetched) {
                    return;
                }

                // If the list is empty, we force a reload from the server
                if(state.users.length === 0) {
                    state.fetcher.reset();
                    state.users = [];
                    return;
                }

                // Does the user exist right now?
                let i=0;
                for( ; i<state.users.length; i++) {
                    if(toId(user) === toId(state.users[i])) {
                        // We have found it, swap it in
                        state.users[i] = user;

                        if(state.fetcher.more) {
                            // Since the name may have changed, the position in the
                            // list could also change.
                            if(User.compare(user, state.users[state.users.length-1]) >= 0) {
                                // Probably off the end, force a reload
                                state.fetcher.reset();
                                state.users = [];
                                return;
                            }
                        }


                        state.users.sort(User.compare);
                        return;
                    }
                }

                // If we did not find the user, it must still
                // be waiting to be fetched from the server.
                state.fetcher.more = true;
            },
            new(state, user) {
                // If nothing is fetched, nothing need be updated
                if(!state.fetcher.fetched) {
                    return;
                }

                // If the list is empty, we are the one!
                if(state.users.length === 0) {
                    state.users.push(user);
                    return;
                }

                if(!state.fetcher.more) {
                    // We have it all, so we can append, sort, and we are done
                    state.users.push(user);
                    state.users.sort(User.compare);
                    return;
                }

                if(User.compare(user, state.users[state.users.length-1]) >= 0) {
                    // Probably off the end, force a reload
                    state.fetcher.reset();
                    state.users = [];
                    return;
                }

                state.users.push(user);
                state.users.sort(User.compare);
            },
            delete(state, id) {
                for (let i = 0; i < state.users.length; i++) {
                    if (toId(state.users[i]) === id) {
                        state.users.splice(i, 1);
                        break;
                    }
                }
            }
        },
        actions: {
            // Initial fetch from API
            fetch({dispatch, state}) {
                if(state.fetcher.fetched) {
                    return;
                }

                dispatch('more');
            },
            // Fetch more
            more({commit, state}) {
                if(state.fetcher.fetched && !state.fetcher.more) {
                    return;
                }

                commit('fetchStart');
                let q = {limit: LIMIT, offset: state.users.length};
                Object.assign(q, state.query);

                Site.api.get(api, q)
                    .then((response) => {
                        if(!response.hasError()) {
                            const data = response.getData('users');
                            if(data !== null) {
                                let more = false;
                                data.attributes.forEach((userObj) => {
                                    if(userObj.more === 'yes') {
                                        more = true;
                                    } else {
                                        commit('add', new Users.User(userObj));
                                    }
                                })

                                commit('more', more);
                                commit('fetchDone');
                            }


                        } else {
                            console.log(response);
                            Site.toast(this, response);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        Site.toast(this, error);
                    });
            },
            get({commit, state}, payload) {
                let id = +payload.id;
                return new Promise((resolve, reject) => {
                    // We may have the desired user loaded or we
                    // may have to go get them.
                    let prev = null;
                    for(let i=0; i<state.users.length; i++) {
                        let user = state.users[i];
                        if(toId(user) === id) {
                            if((i+1) < state.users.length) {
                                user.next = state.users[i+1];
                            }

                            if(prev !== null) {
                                user.prev = prev;
                            }

                            resolve(user);
                            return;
                        }

                        prev = user;
                    }
                    for(let user of state.users) {

                    }

                    // Go get the user
                    commit('fetchStart', true);
                    const query = {
                      id: id,
                      prevnext: 1
                    };
                    Site.api.get(api, query)
                        .then((response) => {
                            if(!response.hasError()) {
                                const data = response.getData('users');
                                if(data !== null) {
                                    if(data.attributes.length < 1) {
                                        reject('User does not exist')
                                    } else {
                                        commit('fetchDone', true);
                                        let user = new Users.User(data.attributes[0]);

                                        const prev = response.getData('prev-user');
                                        if(prev !== null) {
                                            user.prev = new Users.User(prev.attributes);
                                        }

                                        const next = response.getData('next-user');
                                        if(next !== null) {
                                            user.next = new Users.User(next.attributes);
                                        }

                                        resolve(user);
                                    }
                                }

                            } else {
                                console.log(response);
                                Site.toast(this, response);
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            Site.toast(this, error);
                        });

                });
            },
            update({commit, state}, payload) {
                return new Promise((resolve, reject) => {
                    Site.api.post(api + '/update', payload)
                        .then((response) => {
                            if(!response.hasError()) {
                                let data = response.getData('updated-user');
                                let user = new Users.User(data.attributes);

                                // Update user if we have it stored locally
                                // and the name has not changed
                                commit('update', user);
                                resolve(user);
                            } else {
                                reject(response);
                            }

                        })
                        .catch((error) => {
                            Site.toast(this, error);
                        });
                });

            },
            new({commit, state}, payload) {
                return new Promise((resolve, reject) => {
                    Site.api.post(api + '/new', payload)
                        .then((response) => {
                            if(!response.hasError()) {
                                let data = response.getData('new-user');
                                let user = new Users.User(data.attributes);

                                commit('new', user);
                                resolve(user);
                            } else {
                                console.log('reject');
                                reject(response);
                            }

                        })
                        .catch((error) => {
                            Site.toast(this, error);
                        });
                });

            },
            delete({commit, state}, payload) {
                return new Promise((resolve, reject) => {
                    Site.api.post(api + '/delete', {id: payload.id})
                        .then((response) => {
                            if (!response.hasError()) {
                                commit('delete', payload.id);
                                resolve();
                            } else {
                                console.log(response);
                                Site.toast(this, response);
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            Site.toast(this, error);
                        });

                })
            }
        }
    }

}
