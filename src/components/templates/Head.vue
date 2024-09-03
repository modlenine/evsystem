<template>
  <div id="head">
	<div class="header">
		<div class="header-left">
			<div class="menu-icon bi bi-list"></div>
		</div>
		<div class="header-right">
			<!-- <div class="dashboard-setting user-notification">
				<div class="dropdown">
					<a
						class="dropdown-toggle no-arrow"
						href="javascript:;"
						data-toggle="right-sidebar"
					>
						<i class="dw dw-settings2"></i>
					</a>
				</div>
			</div> -->

			<Usernotify/>
			<Userinfo/>
			
		</div>
	</div>
    <Leftmenu/>
	<div class="mobile-menu-overlay"></div>
  </div>
</template>

<script>
import Leftmenu from '@/components/templates/Leftmenu'
import Userinfo from '@/components/templates/Userinfo'
import Usernotify from '@/components/templates/Usernotify'
export default {
  components:{
    Leftmenu ,
	Userinfo,
	Usernotify
  }
}
</script>

<style>

</style>