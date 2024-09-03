<template>
  <div id="userinfo">
    <div class="user-info-dropdown">
        <div class="dropdown">
            <a
                class="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
            >
                <span class="user-icon">
                    <img :src="baseUrl+'assets/vendors/images/userlogin.svg'" alt="" />
                </span>
                <span class="user-name">{{userSessionValue.customer_name}}</span>
            </a>
            <div
                class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list"
            >
                <router-link class="dropdown-item" to="/userdetail"
                    ><i class="dw dw-user1"></i> Profile</router-link>
                <!-- <a class="dropdown-item" href="profile.html"
                    ><i class="dw dw-settings2"></i> Setting</a
                >
                <a class="dropdown-item" href="faq.html"
                    ><i class="dw dw-help"></i> Help</a
                > -->
                <a class="dropdown-item" href="#" @click="handleLogout"><i class="dw dw-logout"></i> Log Out</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed } from 'vue';
export default {
    setup(){
        const store = useStore();
        const userSessionValue = computed(()=> store.getters.getSessionValue);
        // ดึงค่าจาก environment variables
        const baseUrl = process.env.VUE_APP_BASE_URL;

        const handleLogout = async () =>{
            await store.dispatch('deleteSessionValue' , 'userSessionValue');
            location.reload();
        }

        return {
            userSessionValue ,
            handleLogout,
            baseUrl
        }
    }
}
</script>

<style>

</style>