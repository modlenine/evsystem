<template>
  <div id="machinestatus">
    <div class="main-container">
		<div class="xs-pd-20-10 pd-ltr-20">

			<div class="card-box height-100-p pd-20">
				<div class="row form-group">
					<div class="col-md-3"></div>
					<div class="col-md-6">
						<div class="h3 text-center">สถานะตู้ชาร์จ</div>
            <div :class="machineChargerData.charge_point_status ==='Unavailable' ? 'unavaliableCharge' : 'avaliableCharge'">
							{{machineChargerData.charge_point_status}}
						</div><br>
						<div v-if="isLoading" class="charge-animation">
							<div class="charge-bar"></div>
						</div>
					</div>
					<div class="col-md-3"></div>
				</div>
				<div v-if="isShowCharge" class="row clearfix progress-box">
          <div class="col-md-2 form-group"></div>
					<div class="col-md-8 form-group">
						<div class="card-box pd-30 height-100-p d-flex justify-content-center">
							<Knob v-model="currentBatt" valueTemplate="{value}%" :size="200" />
						</div>
					</div>
          <div class="col-md-2 form-group"></div>

					<!-- <div class="col-lg-3 col-md-6 col-sm-12 mb-30">
						<div class="card-box pd-30 height-100-p">
							<Knob v-model="value2" valueTemplate="{value}%" :size="200" valueColor="pink" />
						</div>
					</div> -->
					<!-- <div class="col-lg-3 col-md-6 col-sm-12 mb-30">
						<div class="card-box pd-30 height-100-p">
							<Knob v-model="value3" valueTemplate="{value}%" :size="200" valueColor="orange" />
						</div>
					</div> -->
					<!-- <div class="col-lg-3 col-md-6 col-sm-12 mb-30">
						<div class="card-box pd-30 height-100-p">
							<Knob v-model="value4" valueTemplate="{value}%" :size="200" valueColor="blue" />
						</div>
					</div> -->

				</div>

        <div class="row pb-10" v-if="isShowCharge">
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
                <span><b>Card No. : </b></span><br>
                <span>{{machineChargerData.card_no}}</span>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
                <span><b>เวลาเริ่ม : </b></span><br>
                <span>{{machineChargerData.start_time}}</span>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
                <span><b>เวลาสิ้นสุด : </b></span><br>
                <span>{{machineChargerData.stop_time}}</span>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
                <span><b>จำนวนเงิน : </b></span><br>
                <span>{{sumprice}}</span>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	  </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed , ref , onMounted , onUnmounted} from 'vue'
import axios from 'axios'
import Knob from 'primevue/knob'
import { useRoute, useRouter } from 'vue-router';
export default {
  data() {
		return {

		}
	},
	components:{
		Knob
	},
    setup(){
      const store = useStore();
      // const userSessionValue = computed(()=> store.getters.getSessionValue);
      const backendurl = computed(() => store.getters.getUrl);

      const route = useRoute();
      const router = useRouter();

      const isLoading = ref(false);
      const isShowCharge = ref(false);
      const machineChargerData = ref('');
      let timerId;
      let currentBatt = ref(0);
      let sumprice = ref('');

      const fetchdataChargerAdmin = async () => {
        const formdata = new FormData();
        formdata.append('action' , 'fetchdataChargerAdmin');
        try {
          const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/fetchdataCharger_admin` , formdata , {
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          console.log(res.data);
          // isLoading.value = true;
          if(res.data.status == "Select Data Success"){
            machineChargerData.value = res.data.result;

            if(res.data.result !== null){
              let result = res.data.result;
              if(result.charge_point_status == 'Available' || result.charge_point_status == 'Preparing'){
                isLoading.value = false;
                isShowCharge.value = false;
              }else if(result.charge_point_status == 'Finishing'){
                //code
                isLoading.value = false;
                isShowCharge.value = true;
                fetchdataChargerRealtimeAdmin(result.card_no , result.charge_point_status);
              }else if(result.charge_point_status == 'Unavailable'){
                //code
                isLoading.value = false;
                isShowCharge.value = true;
                fetchdataChargerRealtimeAdmin(result.card_no , result.charge_point_status);
              }else{
                if(result.stop_time === null){
                  isLoading.value = true;
                  isShowCharge.value = true;
                  fetchdataChargerRealtimeAdmin(result.card_no , result.charge_point_status);
                }
              }
            }
            //code
          }
        } catch (err) {
          console.log(err);
        }finally {
          // เรียกฟังก์ชันอีกครั้งหลังจากที่คำขอถูกดำเนินการเสร็จสิ้น
          timerId = setTimeout(fetchdataChargerAdmin, 3000);
        }
      }

      const startFetchingData = () => {
        fetchdataChargerAdmin(); // เริ่มการเช็กข้อมูลครั้งแรก
      };

      const stopFetchingData = () => {
        if (timerId) {
          clearTimeout(timerId); // หยุดการเรียกเมื่อไม่ต้องการแล้ว
        }
      };

      onMounted(() => {
        startFetchingData(); // เริ่มการเช็กเมื่อคอมโพเนนต์ถูกเมานท์
      });

      onUnmounted(() => {
        stopFetchingData(); // หยุดการเช็กเมื่อคอมโพเนนต์ถูกทำลาย
      });

      // ใช้ beforeRouteLeave เพื่อหยุดการทำงานเมื่อออกจากหน้าปัจจุบัน
      router.beforeEach((to, from, next) => {
        if (from.path === route.path) {
          stopFetchingData(); // หยุดการเช็กข้อมูลเมื่อออกจากหน้านี้
        }
        next();
      });

      const fetchdataChargerRealtimeAdmin = async (card_no , status) =>{
        //code
        const formdata = new FormData();
        formdata.append('card_no' , card_no);
        try {
          const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/fetchRealtimeDataCharger_admin` , formdata , {
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          console.log(res.data);
          if(res.data.status == "Select Data Success"){
            let result = res.data.result;
            for(let key in result){
              if(result[key].context == "Sample.Periodic" && result[key].measurand == "SoC"){
                if(status == "Finishing" || result[key].card_no_stop !== null){
                  currentBatt.value = 100;
                }else{
                  currentBatt.value = result[key].meter_value;
                }
                sumprice.value = result[key].price;
              }

            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      return{
        isLoading,isShowCharge,
        machineChargerData,
        startFetchingData,
        stopFetchingData,
        currentBatt , sumprice
      }
    }
}
</script>

<style>

</style>