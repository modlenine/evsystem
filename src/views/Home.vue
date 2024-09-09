<template>
  <div id="Home">
    <div class="main-container">
		<div class="xs-pd-20-10 pd-ltr-20">

			<div class="card-box height-100-p pd-20">
				<div class="row form-group">
					<div class="col-md-3"></div>
					<div class="col-md-6">
						<div class="h3 text-center">สถานะตู้ชาร์จ</div>
							<div v-if="machineChargerData_main !== null">
                <div v-if="machineChargerData !== null">
                  <div :class="machineChargerData_main.charge_point_status ==='Unavailable' ? 'unavaliableCharge' : 'avaliableCharge'">{{machineChargerData_main.charge_point_status}}
                  </div><br>
                </div>
                <div v-else>
                  div.row.g
                  <div class="unavaliableCharge">Unavalilable</div>
                </div>
							</div>
							<div v-else>
								<div class="avaliableCharge">ไม่พบการชาร์จ</div>
							</div>
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

        <div v-if="isShowChargeMain" class="row clearfix progress-box">
          <div class="col-md-12 form-group d-flex justify-content-center mt-3"><h4>ผู้ใช้งานท่านอื่นกำลังใช้บริการ</h4></div>
          <div class="col-md-2 form-group"></div>
					<div class="col-md-8 form-group">
						<div class="card-box pd-30 height-100-p d-flex justify-content-center">
							<Knob v-model="currentBatt_main" valueTemplate="{value}%" :size="200" />
						</div>
					</div>
          <div class="col-md-2 form-group"></div>
				</div>

        <div class="row pb-10" v-if="isShowChargeMain">
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
								<span><b>เวลาเริ่ม : </b></span><br>
								<span>{{machineChargerData_main.start_time}}</span>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						<div class="card-box height-100-p cardCharger">
							<div class="text-center">
								<span><b>เวลาสิ้นสุด : </b></span><br>
								<span>{{machineChargerData_main.stop_time}}</span>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
						
					</div>
				</div>

			</div>

		</div>
	  </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed , ref , onMounted , onUnmounted } from 'vue'
import axios from 'axios'
import Knob from 'primevue/knob'
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
      const userSessionValue = computed(()=> store.getters.getSessionValue);
      const backendurl = computed(() => store.getters.getUrl);

      const isLoading = ref(false);
      const isShowCharge = ref(false);

      const isShowChargeMain = ref(false);

      const machineChargerData = ref('');
      const machineChargerData_main = ref('');

      let timerId;
      let timerId_main;
      let currentBatt = ref(0);
      let currentBatt_main = ref(0);
      let sumprice = ref('');

      const fetchdataCharger = async () => {
        const formdata = new FormData();
        formdata.append('card_no' , userSessionValue.value.card_no);
        try {
          const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/fetchdataCharger` , formdata , {
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
              if(result.charge_point_status == 'Available'){
                isLoading.value = false;
              }else if(result.charge_point_status == 'Finishing'){
                //code
                isLoading.value = false;
                isShowCharge.value = true;
                fetchdataChargerRealtime(result.card_no);
              }else if(result.charge_point_status == 'Unavailable'){
                //code
                isLoading.value = false;
                isShowCharge.value = true;
                fetchdataChargerRealtime(result.card_no);
              }else{
                if(result.stop_time === null){
                  isLoading.value = true;
                  isShowCharge.value = true;
                  fetchdataChargerRealtime(result.card_no);
                }
              }
            }else{
              isShowChargeMain.value = true;
            }
            //code
          }
        } catch (err) {
          console.log(err);
        }finally {
          // เรียกฟังก์ชันอีกครั้งหลังจากที่คำขอถูกดำเนินการเสร็จสิ้น
          timerId = setTimeout(fetchdataCharger, 3000);
        }
      }

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
            machineChargerData_main.value = res.data.result;
            //code
            if(res.data.result !== null){
              let result = res.data.result;
              if(result.charge_point_status == 'Available' || result.charge_point_status == 'Preparing'){
                //code
                isShowChargeMain.value = false;
              }else{
                fetchdataChargerRealtimeAdmin(result.card_no , result.charge_point_status);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }finally {
          // เรียกฟังก์ชันอีกครั้งหลังจากที่คำขอถูกดำเนินการเสร็จสิ้น
          timerId_main = setTimeout(fetchdataChargerAdmin, 3000);
        }
      }

      const startFetchingData = () => {
        fetchdataCharger(); // เริ่มการเช็กข้อมูลครั้งแรก
        fetchdataChargerAdmin();
      };

      const stopFetchingData = () => {
        if (timerId) {
          clearTimeout(timerId); // หยุดการเรียกเมื่อไม่ต้องการแล้ว
          clearTimeout(timerId_main); // หยุดการเรียกเมื่อไม่ต้องการแล้ว
        }
      };

      onMounted(() => {
        startFetchingData(); // เริ่มการเช็กเมื่อคอมโพเนนต์ถูกเมานท์
      });

      onUnmounted(() => {
        stopFetchingData(); // หยุดการเช็กเมื่อคอมโพเนนต์ถูกทำลาย
      });

      // onBeforeRouteLeave((to, from, next) => {
      //   stopFetchingData(); // หยุดการเช็กเมื่อเส้นทางมีการเปลี่ยนแปลง
      //   next();
      // });

      const fetchdataChargerRealtime = async (card_no) =>{
        //code
        const formdata = new FormData();
        formdata.append('card_no' , card_no);
        try {
          const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/fetchRealtimeDataCharger` , formdata , {
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
          console.log(res.data);
          if(res.data.status == "Select Data Success"){
            let result = res.data.result;
            for(let key in result){
              if(result[key].context == "Sample.Periodic" && result[key].measurand == "SoC"){
                if(result[key].card_no_stop !== null){
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
                  currentBatt_main.value = 100;
                }else{
                  currentBatt_main.value = result[key].meter_value;
                }
              }

            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      return{
        isLoading,isShowCharge, isShowChargeMain ,
        machineChargerData, machineChargerData_main ,
        startFetchingData,
        stopFetchingData,
        currentBatt , sumprice , currentBatt_main
      }
    }
}
</script>

<style>

</style>