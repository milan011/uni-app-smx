import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			// console.log(state)
			console.log(provider)
			// return false
			provider.rolenameArr = provider.rolename.split(",")
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log('登录缓存',state);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
        key: 'userInfo'  
      })
		}
	},
	getters: {
	  roleArr: state => state.userInfo.rolenameArr,
	},
	actions: {
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
		    key: 'userInfo'  
		  })
			uni.removeStorage({
			  key: 'hasLogin'  
			})
		}
	}
})

export default store
