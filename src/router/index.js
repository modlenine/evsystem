import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Loginwithqrcode from '@/views/Loginwithqrcode.vue'
import Carddetail from '@/views/Carddetail.vue'
import Chargedetail from '@/views/Chargedetail.vue'
import Userdetail from '@/views/Userdetail.vue'
import Resultactivate from '@/views/Resultactivate.vue'
import Waitactivate from '@/views/Waitactivate.vue'

import Machinestatus from '@/views/adminpage/Machinestatus.vue'
import Forgotpassword from '@/views/Forgotpassword.vue'
import Createnewpassword from '@/views/Createnewpassword.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/carddetail',
    name: 'Carddetail',
    component: Carddetail
  },
  {
    path: '/chargedetail',
    name: 'Chargedetail',
    component: Chargedetail
  },
  {
    path: '/userdetail',
    name: 'Userdetail',
    component: Userdetail
  },
  {
    path:'/loginwithqrcode/:cardid',
    name:'Loginwithqrcode',
    component:Loginwithqrcode
  },
  {
    path:'/result_activate/:accountno/:verifycode',
    name:'Resultactivate',
    component:Resultactivate
  },
  {
    path:'/waitactivate/:account_no',
    name:'Waitactivate',
    component:Waitactivate
  },
  {
    path:'/machinestatus',
    name:'Machinestatus',
    component:Machinestatus
  },
  {
    path:'/forgotpassword',
    name:'Forgotpassword',
    component:Forgotpassword
  },
  {
    path:'/create_newpassword/:account_no',
    name:'Createnewpassword',
    component:Createnewpassword
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
