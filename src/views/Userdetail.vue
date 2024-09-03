<template>
  <div id="userdetail">
      <div class="main-container">
        <div class="xs-pd-20-10 pd-ltr-20">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              
              <br>
              <div class="pd-20 card-box height-100-p">
								<div class="profile-photo">
									<img :src="baseUrl+'assets/vendors/images/photo1.jpg'" alt="" class="avatar-photo">
								</div>
								<h5 class="text-center h5 mb-0">{{userInfo.customer_name}}</h5>
								<p class="text-center text-muted font-14">
                  <span><b>รหัสสมาชิก : </b>{{userInfo.member_no}}</span><br>
									<span><b>ประเภทสมาชิก : </b>{{userInfo.name}}</span>
								</p>
								<div class="profile-info">
									<h5 class="mb-20 h5 text-blue">ข้อมูลสมาชิก</h5>
									<ul>
                    <li>
											<span><b>หมายเลขบัตร EV Charger</b></span>
											{{userInfo.card_no}}
										</li>
										<li>
											<span><b>Email Address:</b></span>
											{{userInfo.email}}
										</li>
										<li>
											<span><b>หมายเลขโทรศัพท์</b></span>
											{{userInfo.telephone_no}}
										</li>
										<li>
											<span><b>ที่อยู่</b></span>
											{{userInfo.address}}
										</li>
									</ul>
								</div>
							</div>
            </div>
            <div class="col-md-3"></div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed , ref } from 'vue'
import axios from 'axios'
export default {
  setup(){
    const store = useStore();
    const userSessionValue = computed(()=> store.getters.getSessionValue);
    const backendurl = computed(() => store.getters.getUrl);
    const userInfo = ref('');
    const baseUrl = process.env.VUE_APP_BASE_URL;

    const getUserInformation = async () => {
      const formdata = new FormData();
      formdata.append('account_no' , userSessionValue.value.account_no);
      formdata.append('email' , userSessionValue.value.email);

      try {
        const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/getUserInformation` , formdata , {
          headers:{
            'Content-Type':'miltipart/form-data'
          }
        });
        console.log(res.data);
        if(res.data.status == "Select Data Success"){
          userInfo.value = res.data.result;
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserInformation();

    return{
      userInfo,
      backendurl,
      baseUrl
    }
  }
}
</script>

<style>

</style>