<template>
  <div id="forgotpassword">
    <div>
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
                    <div class="col-md-12 col-lg-12">
                        <div class="login-box bg-white box-shadow border-radius-10">
                            <div class="login-title">
                                <h2 class="text-center text-primary">ลืมรหัสผ่านเข้าสู่ระบบ</h2>
                            </div>
                            <form>
                                <div class="input-group custom">
                                    <input
                                        type="text"
                                        class="form-control form-control-lg"
                                        placeholder="Email"
                                        v-model="emailInput"
                                    />
                                    <div class="input-group-append custom">
                                        <span class="input-group-text"
                                            ><i class="icon-copy dw dw-user1"></i
                                        ></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="input-group mb-0">
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg btn-block"
                                                :disabled="isBtnReqCrePass"
                                                @click="handleReqCrePass"
                                                >ส่งคำขอสร้างรหัสใหม่</button
                                            >
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {ref , computed} from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const emailInput = ref('');
        const backendurl = computed(() => store.getters.getUrl);
        const isBtnReqCrePass = computed(() => {
            return emailInput.value === '';
        });
        const handleReqCrePass = async () => {
            isBtnReqCrePass.value = true;
            const formdata = new FormData();
            formdata.append('emailInput' , emailInput.value);

            try {
                const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/login/forgotpassword` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                console.log(res);
                if(res.data.status == "Send Email Already"){
                    Swal.fire({
                        title: 'ระบบได้ทำการส่ง Email สำหรับสร้างรหัสผ่านใหม่ให้ท่านแล้ว',
                        text: 'กรุณาตรวจสอบ Email เพื่อดำเนินการตามขั้นตอนของการสร้างรหัสผ่านใหม่',
                        icon: 'success',
                        showConfirmButton:true,
                        // timer:2500
                    }).then(()=>{
                        router.replace("/");
                    });
                }else if(res.data.status == "Not Found Email"){
                    //code
                    Swal.fire({
                        title: 'ไม่พบ Email ในระบบ',
                        text: 'กรุณาตรวจสอบ Email ของท่าน',
                        icon: 'error',
                        showConfirmButton:false,
                        timer:2500
                    }).then(()=>{
                        router.replace("/forgotpassword");
                    });
                }else{
                    //code
                    Swal.fire({
                        title: 'กรุณากรอก Email ให้ถูกต้อง',
                        text: 'กรุณาตรวจสอบช่องกรอก Email ว่าท่านได้ทำการกรอก Email เพื่อขอสร้างรหัสผ่านใหม่แล้วหรือไม่',
                        icon: 'error',
                        showConfirmButton:false,
                        timer:2500
                    }).then(()=>{
                        router.replace("/forgotpassword");
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
        return{
            isBtnReqCrePass,
            emailInput,
            handleReqCrePass
        }
    }
}
</script>

<style>

</style>