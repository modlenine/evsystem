<template>
  <div id="resultactivate">
    <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <div class="brand-logo">
                <a href="login.html">
                    <img :src="baseUrl+'assets/vendors/images/EV Charger (1).svg'" alt="" />
                </a>
            </div>
        </div>
    </div>
    <div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div class="container">
            <div class="row align-items-center">
                <!-- <div class="col-md-6 col-lg-7">
                    <img src="<?=base_url('assets/')?>vendors/images/login-page-img.png" alt="">
                </div> -->
                <div class="col-md-12 col-lg-12">
                    <div class="login-box bg-white box-shadow border-radius-10">
                        <div class="login-title">
                            <h2 class="text-center">ผลการยืนยันการเข้าใช้งานโปรแกรม</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter , useRoute } from 'vue-router';
export default {
    setup(){
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const baseUrl = process.env.VUE_APP_BASE_URL;
        const backendurl = computed(() => store.getters.getUrl);

        // เข้าถึงพารามิเตอร์จาก route
        const account_no = computed(() => route.params.accountno);
        const verifycode = computed(() => route.params.verifycode);

        const updateUserActivate = async (account_no , activatecode) => {
            const formdata = new FormData();
            formdata.append('account_no' , account_no);
            formdata.append('activatecode' , activatecode);

            try {
                const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/updateUserActivate` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                console.log(res.data);
                if(res.data.status == "Activate Success"){
                    let userdata_result = res.data.userdata_result;
                    setSessionValue(userdata_result);
                    Swal.fire({
                        title: 'ยืนยันการเข้าใช้งานโปรแกรมสำเร็จ',
                        text: 'รอสักครู่ระบบกำลังพาท่านเข้าสู่หน้าโปรแกรม',
                        icon: 'success',
                        // confirmButtonText: 'OK'
                        timer:2500
                    }).then(()=>{
                        router.replace('/');
                    });
                }else if(res.data.status == "Lost Time Activate"){
                    let userdata_result = res.data.userdata_result;
                    Swal.fire({
                        title: 'หมดเวลาในการยืนยันตัวตน',
                        text: 'รอสักครู่ระบบกำลังพาท่านไปยังหน้าสำหรับกดส่ง Email อีกครั้งเพื่อยืนยันตัวตน',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        // timer:2500
                    }).then(()=>{
                        router.replace({name:'Loginwithqrcode' , params:{cardid:userdata_result.card_no}});
                    });
                }else if(res.data.status == "You Activate Already"){
                    let userdata_result = res.data.userdata_result;
                    setSessionValue(userdata_result);
                    router.replace('/');
                }
            } catch (err) {
                console.log(err);
            }
        }

        const setSessionValue = (usersession) => {
            store.dispatch('setSessionValue' , {key:'userSessionValue' , value:usersession});
        }

        updateUserActivate(account_no.value , verifycode.value);
        return{
            backendurl , baseUrl ,
            account_no , verifycode,
        };
    }
}
</script>

<style>

</style>