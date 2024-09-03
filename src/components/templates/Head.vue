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
	<!-- This is where the script will be dynamically added -->
    <div id="scripts"></div>
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
  },
	mounted() {
    	this.loadScript();
  	},
	methods: {
		loadScript() {
		// Check if script already exists
		const existingScript = document.querySelector('#scripts script[src="assets/vendors/scripts/script.min.js"]');
		if (existingScript) {
			// If exists, remove it to reload
			existingScript.remove();
		}

		// Create a new script element
		const script = document.createElement("script");
		script.type = "application/javascript";
		script.defer = true;
		script.src = "assets/vendors/scripts/script.min.js"; // Update this path as needed
		script.onload = () => {
			console.log("Script loaded successfully.");
			// You can add any initialization code here if needed after the script loads
		};

			// Append the script to the div#scripts
			document.getElementById("scripts").appendChild(script);
		},
  	},
}
</script>

<style>

</style>