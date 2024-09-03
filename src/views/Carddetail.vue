<template>
  <div id="carddetail">
    <div class="main-container">
      <div class="xs-pd-20-10 pd-ltr-20">

        <div class="card-box height-100-p pd-20">
          <div class="h5 pd-20 mb-0"><u>ข้อมูลบัตร</u></div>
          <div class="row form-group">
            <div class="col-md-3"></div>
            <div class="col-md-6 d-flex justify-content-center">
              <div class="evCard">
                <div class="row">
                  <div class="col-12 evCard-no">หมายเลขบัตร : {{cardData.card_no}}</div>
                    <div v-if="cardData.name == 'Prepaid'" class="col-12 evCard-amount">
                        <span>ยอดเงินคงเหลือ</span><br>
                        <span class="evCard-money">{{parseFloat(cardData.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}} บาท</span>
                    </div>
                    <div v-else class="col-12 evCard-amount">
                        <span>บัตรรายเดือน</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-md-3"></div>
          </div>

          <div class="row form-group">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <div class="pb-20">
                <table id="tbl_cardTransection" class="table stripe hover">
                  <thead>
                    <tr>
                        <th>ข้อมูลผู้ใช้</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {computed , watch , ref , onBeforeUnmount } from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
import $ from 'jquery'

export default {
  setup(){
    const store = useStore();
    const userSessionValue = computed(()=> store.getters.getSessionValue);
    const backendurl = computed(() => store.getters.getUrl);

    const cardData = ref('');

    const getCardData = async () => {
      const formdata = new FormData();
      formdata.append('account_no' , userSessionValue.value.account_no);
      formdata.append('email' , userSessionValue.value.email);

      try {
        const res = await axios.post(`${backendurl.value}evsystem/evsystem_backend/main/getCardData` , formdata , {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        });
        console.log(res.data);
        if(res.data.status == "Select Data Success"){
          cardData.value = res.data.result;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getCardTransactionData = (card_no) => {
        // let thid = 1;
        // $('#tbl_cardTransection thead th').each(function() {
        //     let title = $(this).text();
        //     $(this).html(title + '<br><input type="text" id="tbl_cardTransection'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
        //     thid++;
        // });
        $('#tbl_cardTransection').DataTable().destroy();
        $('#tbl_cardTransection').DataTable({
            // "scrollX": true,
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "pageLength":20,
            stateLoadParams: function(settings, data) {
                for (let i = 0; i < data.columns["length"]; i++) {
                    let col_search_val = data.columns[i].search.search;
                    if (col_search_val !== "") {
                        $("input", $("#tbl_cardTransection thead th")[i]).val(col_search_val);
                    }
                }
            },
            "ajax": {
                "url":`${backendurl.value}evsystem/evsystem_backend/main/getCardTransactionData`,
                "type": "POST",
                "data":function(d){
                    d.card_no = card_no;
                }
            },
            "initComplete": function() {
              $('#tbl_cardTransection thead').hide();
            },
            order: [
                [0, 'desc'],
            ],
            columnDefs: [
              {
                targets: "_all",
                orderable: false
              },
              // {
              //   targets: [0],
              //   width: "100px",
              // },
            ],
        });

        // table.columns().every(function() {
        //   let table = this;
        //   $('input', this.header()).on('keyup change', function() {
        //       if (table.search() !== this.value) {
        //           table.search(this.value).draw();
        //       }
        //   });
        // });
    }

    watch(userSessionValue.value , (newUserSessionValue) => {
      if(newUserSessionValue){
          getCardData();
      }
    },{immediate:true});

    watch(cardData, (newCardData) => {
      if (newCardData) {
        getCardTransactionData(newCardData.card_no);
      }
    });


    onBeforeUnmount(() => {
      // ตรวจสอบว่ามี DataTable เดิมอยู่หรือไม่ ถ้ามีให้ทำลาย (destroy) มันก่อน
      $('#tbl_cardTransection').DataTable().destroy();
    });

    return{
      userSessionValue , backendurl,
      cardData
    };
  }
}
</script>

<style>

</style>