import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		second: 0
	},
	mutations: {
		incrent(state) {
			state.second ++;
		}
	}
})