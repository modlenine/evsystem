<template>
  <div id="createnewpassword">
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
                            <h2 class="text-center text-primary">สร้างรหัสผ่านใหม่ สำหรับเข้าสู่ระบบ</h2>
                        </div>
                        <form>
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
</template>

<script>
import {ref , computed} from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import { useRouter , useRoute } from 'vue-router';
export default {
    setup() {
        const password = ref('');
        const store = useStore();
        const confirmpassword = ref('');
        const router = useRouter();
        const route = useRoute();
        const backendurl = computed(() => store.getters.getUrl);
        const account_no = computed(() => route.params.account_no || '');

        const isBtnSavePass = computed(() => {
            return password.value === '' || confirmpassword.value === '' || password.value !== confirmpassword.value;
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
                'is-valid': isPasswordValid.value,
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
            const formdata = new FormData();
            formdata.append('newpassword' , password.value);
            formdata.append('account_no' , account_no.value);
            try {
                const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/login/create_newpassword` , formdata , {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });
                console.log(res.data);
                if(res.data.status == "Update Data Success"){
                    Swal.fire({
                        title: 'บันทึกรหัสผ่านใหม่เรียบร้อยแล้ว',
                        text: 'ระบบได้ทำการเปลี่ยนรหัสผ่านใหม่ ให้ท่านเรียบร้อยแล้วกรุณา Login เข้าสู่ระบบ',
                        icon: 'success',
                        showConfirmButton:true,
                        // timer:2500
                    }).then(()=>{
                        router.replace("/");
                    });
                }else{
                    Swal.fire({
                        title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                        text: 'กรุณาติดต่อเจ้าหน้าที่',
                        icon: 'error',
                        showConfirmButton:true,
                        // timer:2500
                    }).then(()=>{
                        router.replace("/");
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        return{
            isPasswordValid , inputConfirmPasswordClass , isConfirmPasswordValid , inputPasswordClass ,
            isBtnSavePass ,
            password , confirmpassword ,
            handleSubmit
        }
    }
}
</script>

<style>

</style>