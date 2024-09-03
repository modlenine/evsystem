<template>
  <div id="app">
    <div v-if="userSessionValue !== null && userSessionValue !==''">
      <Head/>
      <router-view></router-view>
    </div>
    <div v-else>
      <component :is="componentToShow"></component>
    </div>
  </div>
</template>

<script>
import Head from '@/components/templates/Head.vue'
import LoginwithqrcodeVue from '@/views/Loginwithqrcode.vue'
import ResultactivateVue from '@/views/Resultactivate.vue'

import { useRoute } from 'vue-router';
import { computed , watch } from 'vue';
import { useStore } from 'vuex';
import ForgotpasswordVue from '@/views/Forgotpassword.vue'
import CreatenewpasswordVue from '@/views/Createnewpassword.vue'
export default {
  name:'App',
    components:{
    Head,
    LoginwithqrcodeVue,
    ResultactivateVue,
  },
  data() {
    return {

    }
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const userSessionValue = computed(()=> store.getters.getSessionValue);

    const loadUserSessionValue = () => {
        store.dispatch('fetchSessionValue' , 'userSessionValue');
        // const expireTime = userSessionValue.value.login_expire;
        // const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        // console.log(expireTime+' '+currentUnixTimestamp);
    }

    const userActivateStatus = computed(() => store.state.userActivateStatus);

    // กำหนดเงื่อนไขในการเลือก component
    const componentToShow = computed(() => {
      const path = route.path;
      if (path.startsWith('/result_activate')) {
        return ResultactivateVue;
      } else if (path.startsWith('/forgotpassword')) {
        return ForgotpasswordVue;
      }else if(path.startsWith('/create_newpassword')){
        return CreatenewpasswordVue;
      } else {
        return LoginwithqrcodeVue;
      }
    });

    loadUserSessionValue();

    // เช็ก expiration ของ session
    watch(userSessionValue, (newSessionValue) => {
      if (newSessionValue && newSessionValue.login_expire) {
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const expireTime = newSessionValue.login_expire;

        if (expireTime <= currentUnixTimestamp) {
          store.dispatch('deleteSessionValue', 'userSessionValue'); // ลบค่าใน localStorage
          store.dispatch('fetchSessionValue', 'userSessionValue'); // โหลดค่าใหม่เพื่อลบ session
        }
      }
    });

    return {
      currentRoute: route.path,
      cardid:route.params,
      userSessionValue , loadUserSessionValue ,
      userActivateStatus ,
      componentToShow
    };
  }
}
</script>

<style>

</style>