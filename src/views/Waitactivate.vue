<template>
    <div id="waitactivate">
        <div class="login-header box-shadow">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <div class="brand-logo">
                    <a href="#">
                        <!-- <img src="<?=base_url('assets/')?>vendors/images/deskapp-logo.svg" alt=""> -->
                        <div style="color:gray;">Salee Colour e-Billing System</div>
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
                                <h4 style="font-size:16px;line-height:30px;" class="text-center">กรุณายืนยันตัวตนผ่าน Email ที่ท่านลงทะเบียน หรือคลิก ส่งอีเมลซ้ำ</h4><br>
                                <button type="button" class="btn btn-primary" id="btn-resendEmail" name="btn-resendEmail">ส่งอีเมลซ้ำ<span style="display:none;" class="ml-2 textCount"></span></button><br>
                                <router-link :to="'/editemailactivate/'+this.$route.params.waittaxid"><button type="button" class="btn btn-info mt-2" id="btn-editEmail" name="btn-editEmail">แก้ไขอีเมล</button></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
    setup(){
        const route = useRoute();

        const account_no = route.params.account_no;

        return{
            account_no,
        }
    }
}
</script>

<style>

</style>