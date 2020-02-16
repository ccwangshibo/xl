import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import state from './state.js'
import mutations from './mutations'
import actions from './actions'
// 输出
export default new Vuex.Store({
	state,
	mutations,
	actions
})