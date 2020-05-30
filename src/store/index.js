import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex);


const state = {
    // blogId: '',
    // typeId: '',
    // tagId: ''
};
const mutations = {
  // updateBlogId(state, payload) {
  //   state.blogId = payload
  // },

};

const getters = {

};

const actions = {
  // aupdateBlogId(context,payload) {
  //   context.commit('updateBlogId', payload.blogId)
  //   // module里面的actions只会调用该模块里的mutations
  // },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {}

})
