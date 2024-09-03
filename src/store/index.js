import { createStore } from 'vuex'

export default createStore({
  state: {
    url:'',
    sessionValue:null,
    userActivateStatus:null
  },
  mutations: {
    setUrl(state , value){
      state.url = value
    },
    setSessionValue(state , value){
      state.sessionValue = value;
    },
    setUserActivateStatus(state , value){
      state.userActivateStatus = value;
    },
    removeSessionValue(state){
      state.sessionValue = null;
    }
  },
  getters:{
    getUrl(state){
      if(typeof window !== "undefined"){
        return state.url = window.location.protocol+"//"+window.location.hostname+"/";
      }
    },
    getUserActivate(state){
      state.userActivateStatus;
    },
    getSessionValue(state){
      return state.sessionValue;
    }
  },
  actions: {
    fetchSessionValue({commit} , key){
      const value = localStorage.getItem(key);
      commit('setSessionValue' , value ? JSON.parse(value) : null);
    },
    setSessionValue({commit} , {key , value}){
      localStorage.setItem(key , JSON.stringify(value));
      commit('setSessionValue' , value);
    },
    updateUserActivateStatus({commit} , status){
      commit('setUserActivateStatus' , status);
    },
    deleteSessionValue({commit} , key){
      localStorage.removeItem(key);
      commit('removeSessionValue');
    },
  },
  modules: {
  }
})
