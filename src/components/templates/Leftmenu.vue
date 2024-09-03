<template>
  <div id="leftmenu">
    <div class="left-side-bar">
        <div class="brand-logo">
            <router-link to="/">
                <img :src="baseUrl+'assets/vendors/images/EV Charger (1).svg'" alt="" />
            </router-link>
            <div class="close-sidebar" data-toggle="left-sidebar-close">
                <i class="ion-close-round"></i>
            </div>
        </div>
        <div class="menu-block customscroll">
            <div class="sidebar-menu">
                <ul id="accordion-menu">
                    <li>
                        <router-link to="/" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-calendar4-week"></span
                            ><span class="mtext">หน้าแรก</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/carddetail" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-diagram-3"></span
                            ><span class="mtext">ข้อมูลบัตร EV Charger</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/chargedetail" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-chat-right-dots"></span
                            ><span class="mtext">ข้อมูลการชาร์จ</span>
                        </router-link>
                    </li> -->
                    <li>
                        <router-link to="/userdetail" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-receipt-cutoff"></span
                            ><span class="mtext">ข้อมูลผู้ใช้</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/loginwithqrcode/123" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-receipt-cutoff"></span
                            ><span class="mtext">Login with qrcode</span>
                        </router-link>
                    </li> -->
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>

                    <li v-if="adminMenu">
                        <div class="sidebar-small-cap">สำหรับผู้ดูแล</div>
                    </li>
                    <li v-if="adminMenu">
                        <router-link to="/machinestatus" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-layout-text-window-reverse"></span>
                            <span class="mtext">สถาะตู้ชาร์จ</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-layout-text-window-reverse"></span>
                            <span class="mtext">ข้อมูลการชาร์จไฟ</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/" class="dropdown-toggle no-arrow">
                            <span class="micon bi bi-layout-text-window-reverse"></span>
                            <span class="mtext">ข้อมูลลูกค้า</span>
                        </router-link>
                    </li> -->
                   
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {ref , computed} from 'vue'
import { useStore } from 'vuex';

export default {
    setup(){
        const baseUrl = process.env.VUE_APP_BASE_URL;
        const adminMenu = ref(false);
        const store = useStore();

        const userSessionValue = computed(()=> store.getters.getSessionValue);

        const checkadminMenu = () => {
            if(userSessionValue.value.user_permission == "admin"){
                adminMenu.value = true;
            }
        }
        checkadminMenu();

        return{
            baseUrl ,
            adminMenu ,
            userSessionValue
        }
    }
}
</script>

<style>

</style>