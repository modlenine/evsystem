<template>
  <div id="loginwithqrcode">
    <div v-if="isVisCrePass">
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
                                <h2 class="text-center text-primary">สร้างรหัสผ่าน สำหรับเข้าสู่ระบบ</h2>
                            </div>
                            <form>
                                <div class="input-group custom">
                                    <input
                                        type="text"
                                        class="form-control form-control-lg"
                                        placeholder="Username"
                                        v-model="data.result.email"
                                        readonly
                                    />
                                    <div class="input-group-append custom">
                                        <span class="input-group-text"
                                            ><i class="icon-copy dw dw-user1"></i
                                        ></span>
                                    </div>
                                </div>
                                <div class="input-group custom">
                                    <input
                                        type="password"
                                        class="form-control form-control-lg"
                                        placeholder="รหัสผ่านใหม่"
                                        minlength="6"
                                        maxlength="20"
                                        required
                                        :class="inputPasswordClass"
                                        v-model="password"
                                    />
                                    <!-- <div class="input-group-append custom">
                                        <span class="input-group-text"
                                            ><i class="dw dw-padlock1"></i
                                        ></span>
                                    </div> -->
                                    <!-- ข้อความแสดงข้อผิดพลาดเมื่อรหัสผ่านไม่ตรงตามเงื่อนไข -->
                                    <div v-if="!isPasswordValid" class="invalid-feedback">
                                        รหัสผ่านควรอยู่ระหว่าง 6 ถึง 20 ตัวอักษร ห้ามกรอกเครื่องหมาย ' และ "
                                    </div>
                                </div>
                                <div class="input-group custom">
                                    <input
                                        type="password"
                                        class="form-control form-control-lg"
                                        placeholder="ยืนยันรหัสผ่านใหม่"
                                        minlength="6"
                                        maxlength="20"
                                        :class="inputConfirmPasswordClass"
                                        required
                                        v-model="confirmpassword"
                                    />
                                    <div v-if="confirmpassword && !isConfirmPasswordValid" class="invalid-feedback">
                                        รหัสผ่าน และ ยืนยันรหัสผ่านไม่ตรงกัน
                                    </div>
                                </div>
                                <!-- <div class="row pb-30">
                                    <div class="col-6"></div>
                                    <div class="col-6">
                                        <div class="forgot-password">
                                            <a href="forgot-password.html">Forgot Password</a>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="input-group mb-0">
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-lg btn-block"
                                                :disabled="isBtnSavePass"
                                                @click="handleSubmit"
                                                >ยืนยันการสร้างรหัสผ่านใหม่</button
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
    <div v-if="isVisLogin">
        <section>
            <div class="login-header box-shadow">
                <div class="container-fluid d-flex justify-content-between align-items-center">
                    <div class="brand-logo">
                        <a href="login.html">
                            <img :src="baseUrl+'assets/vendors/images/EV Charger (1).svg'" alt="" />
                        </a>
                    </div>
                    <div class="login-menu">
    
                    </div>
                </div>
            </div>
            <div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-12 col-lg-12">
                            <div class="login-box bg-white box-shadow border-radius-10">
                                <div class="login-title">
                                    <h2 class="text-center text-primary">เข้าสู่ระบบ</h2>
                                </div>
                                <form>
                                    <div class="input-group custom">
                                        <input
                                            type="text"
                                            class="form-control form-control-lg"
                                            placeholder="Username"
                                            v-model="usernameInput"
                                        />
                                        <div class="input-group-append custom">
                                            <span class="input-group-text"
                                                ><i class="icon-copy dw dw-user1"></i
                                            ></span>
                                        </div>
                                    </div>
                                    <div class="input-group custom">
                                        <input
                                            type="password"
                                            class="form-control form-control-lg"
                                            placeholder="Password"
                                            v-model="passwordInput"
                                        />
                                        <div class="input-group-append custom">
                                            <span class="input-group-text"
                                                ><i class="dw dw-padlock1"></i
                                            ></span>
                                        </div>
                                    </div>
                                    <div class="row pb-30">
                                        <div class="col-6">
                                           
                                        </div>
                                        <div class="col-6">
                                            <div class="forgot-password">
                                                <router-link to="/forgotpassword">ลืมรหัสผ่าน</router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="input-group mb-0">
                                                <button
                                                    type="button"
                                                    class="btn btn-primary btn-lg btn-block"
                                                    :disabled="isBtnLogin"
                                                    @click="handleLogin"
                                                    >ลงชื่อเข้าใช้</button
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
        </section>
    </div>
    <div v-if="isVisWaitActivate">
        <section>
            <div class="login-header box-shadow">
                <div class="container-fluid d-flex justify-content-between align-items-center">
                    <div class="brand-logo">
                        <a href="login.html">
                            <img :src="baseUrl+'assets/vendors/images/EV Charger (1).svg'" alt="" />
                        </a>
                    </div>
                    <div class="login-menu">
                        
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
                                <div class="login-title text-center">
                                    <h2>{{account_no}}</h2>
                                    <h4 style="font-size:16px;line-height:30px;" class="text-center">กรุณายืนยันตัวตนผ่าน Email ที่ท่านลงทะเบียน หรือคลิก ส่งอีเมลซ้ำหากไม่ได้รับ Email</h4><br>
                                    <button type="button" class="btn btn-primary" id="btn-resendEmail" @click="handleResendEmail" name="btn-resendEmail">ส่งอีเมลซ้ำ<span style="display:none;" class="ml-2 textCount"></span></button><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed , ref , watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:"Loginwithqrcode",
    data() {
        return {
            // isVisCrePass:false,
            // isVisLogin:false,
        }
    },
    //composition api
    setup(){
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        // ใช้ computed เพื่อให้ cardid อัพเดตอัตโนมัติเมื่อ route.params เปลี่ยนแปลง
        const cardid = computed(() => route.params.cardid || '');
        // ดึงค่าจาก environment variables
        const baseUrl = process.env.VUE_APP_BASE_URL;
        const backendurl = computed(() => store.getters.getUrl);

        const data = ref(null);
        const error = ref(null);
        const intranetAccount = ref(null);

        const usernameInput = ref('');
        const passwordInput = ref('');

        const userSessionValue = computed(()=> store.getters.getSessionValue);
        const loadUserSessionValue = () => {
            store.dispatch('fetchSessionValue' , 'userSessionValue');
        }

        loadUserSessionValue();

        // เข้าถึง state โดยใช้ computed เพื่อให้ reactive
        const updateUserActivateStatus = (status) => {
            store.dispatch('updateUserActivateStatus', status);
        };

        let password = ref('');
        let confirmpassword = ref('');
        let isSubmitting = ref(false);

        let isVisCrePass = ref(false);
        let isVisLogin = ref(false);
        let isVisWaitActivate = ref(false);
        

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('cardid' , cardid.value);

            try{
                const response = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/getUserFromSchniderDatabase` , formData , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                data.value = response.data;
                let result = response.data.result;
                error.value = null;
                console.log(response.data);
                if(response.data.status == "Select Data Success"){
                    fetchDataOnIntranet(result.cardid , result.email , result.account_no);
                }else if(response.data.status == "Not Found Data"){
                    //code
                    Swal.fire({
                        title: 'ไม่พบข้อมูลในระบบ',
                        text: 'กรุณาติดต่อเจ้าหน่าที่',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(()=>{
                        isVisLogin.value = true;
                    });
                }else{
                    //code
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }catch(err){
                error.value = err;
                data.value = null;
            }
        };

        const fetchDataOnIntranet = async (cardid , email , account_no) => {
            const formdata = new FormData();
            formdata.append('cardid' , cardid);
            formdata.append('email' , email);
            formdata.append('account_no' , account_no);

            try {
                const response = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/getUserFromIntranetDatabase` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                intranetAccount.value = response.data.user_result;
                error.value = null;
                console.log(response.data);
                console.log('userSession : '+userSessionValue.value);
                if(response.data.status === "Not Found Data"){
                    Swal.fire({
                        title: 'สวัสดีคุณ '+data.value.result.customer_name,
                        text: 'กรุณารอสักครู่ระบบกำลังพาท่านไปยังหน้าสร้างรหัสผ่าน',
                        icon: 'success',
                        showConfirmButton:false,
                        timer:2500
                    }).then(()=>{
                        isVisCrePass.value = true;
                        isVisLogin.value = false;
                        isVisWaitActivate.value = false;
                    });
                }else if(response.data.status === "Send To Login"){
                    let result = response.data.user_result;
                     // เรียกใช้งาน action
                    updateUserActivateStatus(result.status);
                    if(result.status === "wait activate"){
                        Swal.fire({
                            title: 'สวัสดีคุณ '+result.customer_name,
                            text: 'กรุณายืนยันการเข้าใช้งานโปรแกรมบน Email ที่ท่านได้ทำการลงทะเบียนเอาไว้ จากนั้นคลิกที่ปุ่ม OK',
                            icon: 'success',
                            showConfirmButton:true,
                            // timer:2500
                        }).then(()=>{
                            //redirect to wait activate page
                            isVisCrePass.value = false;
                            isVisWaitActivate.value = true;
                            isVisLogin.value = false;
                            // isVisWaitActivate.value = false;
                        });
                        
                    }else{
                        //check login already
                        if(userSessionValue.value === null){
                            isVisLogin.value = true;
                            isVisWaitActivate.value = false;
                            isVisCrePass.value = false;
                        }else{
                            router.replace("/");
                        }
                    }
                    console.log(result.account_no);
                }
            } catch (err) {
                error.value = err;
                intranetAccount.value = null;
            }
        }

        const isBtnSavePass = computed(() => {
            return password.value === '' || confirmpassword.value === '' || password.value !== confirmpassword.value;
        });

        let isBtnLogin = computed(() => {
            if(passwordInput.value === '' || usernameInput.value === ''){
                return true;
            }else{
                return false;
            }
        });

        // ตรวจสอบว่า password ตรงตามเงื่อนไขที่กำหนด
        const isPasswordValid = computed(() => {
            const minLength = 6;
            const maxLength = 20;
            const noQuotes = /^[^'"]+$/;
            return (
                password.value.length >= minLength &&
                password.value.length <= maxLength &&
                noQuotes.test(password.value)
            );
        });

        // คลาส CSS ที่จะใช้เมื่อรหัสผ่านไม่ตรงตามเงื่อนไข
        const inputPasswordClass = computed(() => {
            return {
                'form-control': true,
                'form-control-lg': true,
                'is-invalid': !isPasswordValid.value,
                'is-valid': isPasswordValid.value
            };
        });

        // ตรวจสอบว่า confirm password ตรงกับ password หรือไม่
        const isConfirmPasswordValid = computed(() => {
            return confirmpassword.value === password.value && isPasswordValid.value;
        });

        // คลาส CSS สำหรับ confirm password
        const inputConfirmPasswordClass = computed(() => {
            return {
                'form-control': true,
                'form-control-lg': true,
                'is-invalid': confirmpassword.value && !isConfirmPasswordValid.value,
                'is-valid': isConfirmPasswordValid.value
            };
        });

        const handleSubmit = async () => {
            //การจัดการเมื่อปุ่มถูกคลิก
            isSubmitting.value = true;//ปิดปุ่มส่งข้อมูล
            const formdata  = new FormData();
            formdata.append('password' , password.value);
            formdata.append('email' , data.value.result.email);
            formdata.append('card_no' , data.value.result.card_no);
            formdata.append('customer_name' , data.value.result.customer_name);
            formdata.append('account_no' , data.value.result.account_no);

            try {
                const response = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/saveCreatePassword` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                console.log(response.data);
                if(response.data.status == "Insert Data Success"){
                    //Redirect ไปหน้ารอ Wait activate
                    fetchDataOnIntranet(data.value.result.card_no , data.value.result.email , data.value.result.account_no);
                }else{
                    Swal.fire({
                        title: 'ไม่สามารถบันทึกข้อมูลได้',
                        text: 'กรุณาติดต่อ แอดมินเพื่อตรวจสอบข้อมูล',
                        icon: 'error',
                        showConfirmButton:true,
                    }).then(()=>{
                        location.reload();
                    });
                }
            } catch (err) {
                //code
                error.value = err;
                console.error(err);
            } finally {
                isSubmitting.value = false; // ตั้งค่า isSubmitting เป็น false หลังจากการส่งข้อมูลเสร็จสิ้น
            }
        };

        const handleLogin = async () => {
            isBtnLogin.value = true;
            const formdata = new FormData();
            formdata.append('usernameInput' , usernameInput.value);
            formdata.append('passwordInput' , passwordInput.value);

            try {
                const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/login/saveLogin` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                console.log(res.data);
                if(res.data.status == "Login Success"){
                    let user_result = res.data.user_result;
                    Swal.fire({
                        title: 'ลงชื่อเข้าใช้สำเร็จ',
                        text: 'ระบบกำลังพาท่านเข้าสู่โปรแกรม',
                        icon: 'success',
                        showConfirmButton:false,
                        timer:2500
                    }).then(()=>{
                        if(setSessionValue(user_result)){
                            location.reload();
                        }
                    });
                }else if(res.data.status == "Not Found Data"){
                    Swal.fire({
                        title: 'กรุณาตรวจสอบ Username , Password ว่าถูกต้องหรือไม่',
                        text: 'ระบบไม่พบข้อมูลของท่านกรุราตรวจสอบ username , password',
                        icon: 'error',
                        showConfirmButton:false,
                        timer:2500
                    });
                }else{
                    Swal.fire({
                        title: 'กรุณาตรวจสอบ Username , Password ว่าถูกต้องหรือไม่',
                        text: 'ระบบไม่พบข้อมูลของท่านกรุราตรวจสอบ username , password',
                        icon: 'error',
                        showConfirmButton:false,
                        timer:2500
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleResendEmail = async () => {
            const formdata = new FormData();
            formdata.append('account_no' , intranetAccount.value.account_no);

            try {
                const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/resendEmail` , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                console.log(res.data);
                if(res.data.status == "Update Data Success"){
                    Swal.fire({
                        title: 'ส่ง Email ซ้ำสำเร็จ',
                        text: 'กรุณายืนยันตัวตนผ่าน Email ที่ท่านลงทะเบียน',
                        icon: 'success',
                        showConfirmButton:true,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        const setSessionValue = (usersession) => {
            store.dispatch('setSessionValue' , {key:'userSessionValue' , value:usersession});
        }


        watch(cardid , (newCardid) => {
            if(newCardid){
                fetchData();
            }else{
                isVisLogin.value = true;
            }
        },{immediate:true});

        return {
            cardid,
            baseUrl,
            backendurl,
            data,
            error,
            intranetAccount,
            isVisCrePass , isVisLogin , isVisWaitActivate ,
            password , confirmpassword,
            isBtnSavePass, isBtnLogin ,
            isPasswordValid,
            inputPasswordClass , inputConfirmPasswordClass ,
            handleSubmit ,
            userSessionValue , loadUserSessionValue ,
            usernameInput , passwordInput ,
            handleLogin ,
            handleResendEmail
        };
    }
}
</script>

<style>

</style>