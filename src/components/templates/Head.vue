<template>
  <div id="head">
	<div class="header" @click="changeToggleMenu">
		<div class="header-left" @click="toggleMenu">
			<div class="menu-icon dw dw-menu"></div>
		</div>
		<div class="header-right">
			<!-- <div class="dashboard-setting user-notification">
				<div class="dropdown">
					<a
						class="dropdown-toggle no-arrow"
						href="javascript:;"
						data-toggle="right-sidebar"
					>
						<i class="dw dw-settings2"></i>
					</a>
				</div>
			</div> -->

			<Usernotify/>
			<Userinfo/>
			
		</div>
	</div>
    <!-- <Leftmenu/> -->
	<div class="left-side-bar" :class="{ open: isMenuOpen }">
        <div class="brand-logo">
            <router-link to='/'>
                <img :src="baseUrl+'assets/vendors/images/EV Charger (1).svg'" alt="" />
                <!-- <span style="font-size:28px;color:#fff;"><b>Purchase Plus</b></span> -->
            </router-link>
            <div class="close-sidebar" data-toggle="left-sidebar-close">
                <i class="ion-close-round"></i>
            </div>
        </div>
        <div class="menu-block customscroll">
            <div class="sidebar-menu">
                <ul id="accordion-menu">
                    <li class="admin-section mt-3">
                        <div class="sidebar-small-cap mtext">เมนูหลัก</div>
                    </li>
                    <li class="dropdown">
                        <router-link to='/' class="dropdown-toggle no-arrow menu">
                            <span class="micon dw dw-home wdfI1"></span><span class="mtext">หน้าหลัก</span>
                        </router-link>
                    </li>
                    <li class="dropdown">
                        <router-link to='/carddetail' class="dropdown-toggle no-arrow menu">
                            <span class="micon dw dw-add-file1"></span><span class="mtext">ข้อมูลบัตร EV Charger</span>
                        </router-link>
                    </li>
                    <li class="dropdown">
                        <router-link to='/userdetail' class="dropdown-toggle no-arrow menu">
                            <span class="micon dw dw-list3"></span><span class="mtext">ข้อมูลผู้ใช้</span>
                        </router-link>
                    </li>

                    <li class="admin-section">
                        <div class="dropdown-divider"></div>
                    </li>
                    <li>
                        <div class="custom-horizontal-line"></div>
                    </li>
                    <li v-if="adminMenu">
                        <div class="sidebar-small-cap">สำหรับผู้ดูแล</div>
                    </li>
                    <li v-if="adminMenu">
                        <router-link to='/machinestatus' class="dropdown-toggle no-arrow">
                            <span class="micon dw dw-settings1"></span><span class="mtext">สถานะตู้ชาร์จ</span>
                        </router-link>
                    </li>
                    <!-- <li v-if="adminMenu">
                        <router-link to='/machinestatus' class="dropdown-toggle no-arrow">
                            <span class="micon dw dw-settings1"></span><span class="mtext">รายละเอียดผู้ใช้งาน</span>
                        </router-link>
                    </li> -->
                    
                </ul>
            </div>
        </div>
    </div>
    <div class="mobile-menu-overlay" :class="{ show: isMenuOpen }"></div>
  </div>
</template>

<script>
// import Leftmenu from '@/components/templates/Leftmenu'
import Userinfo from '@/components/templates/Userinfo'
import Usernotify from '@/components/templates/Usernotify'
// import $ from 'jquery'
import {ref , computed} from 'vue'
import { useStore } from 'vuex';

export default {
  components:{
    // Leftmenu ,
	Userinfo,
	Usernotify
  },
	setup() {
        const baseUrl = process.env.VUE_APP_BASE_URL;
        const adminMenu = ref(false);
        const store = useStore();

        let isMenuOpen = ref(false);

        const userSessionValue = computed(()=> store.getters.getSessionValue);

        const checkadminMenu = () => {
            if(userSessionValue.value.user_permission == "admin"){
                adminMenu.value = true;
            }
        }

        const toggleMenu = () => {
			console.log('Menu toggled:', isMenuOpen.value);
            isMenuOpen.value = !isMenuOpen .value;
        }

        const changeToggleMenu = () => {
            isMenuOpen.value = true;
        }

        checkadminMenu();

		return{
            baseUrl ,
            adminMenu ,
            userSessionValue ,
            isMenuOpen , toggleMenu , changeToggleMenu
		}
	}
}
</script>

<style>

</style>