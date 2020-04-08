<template>
	<view>
		<scroll-view style="height:45vh;" v-show="currentStatus === 0"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="长宽高" 
					:tips="StatusData.car_length + 'cm*' + StatusData.car_width + 'cm*' +StatusData.car_height + 'cm'">
				</list-cell>
				<list-cell
					title="车门/车座" 
					:tips="StatusData.door_num + '/' + StatusData.seat_num">
				</list-cell>
				<list-cell
					title="级别" 
					:tips="StatusData.car_level">
				</list-cell>
				<list-cell
					title="发动机" 
					:tips="StatusData.engine">
				</list-cell>
				<list-cell
					title="最大扭矩" 
					:tips="StatusData.max_torque">
				</list-cell>
				<list-cell
					title="后悬挂类型" 
					:tips="StatusData.rear_suspension_type">
				</list-cell>
				<list-cell
					title="燃油类型" 
					:tips="StatusData.fuel_type">
				</list-cell>
				<list-cell
					title="油耗" 
					:tips="StatusData.measured_oil_consumption">
				</list-cell>
				<list-cell
					title="变速箱" 
					:tips="StatusData.TM_type">
				</list-cell>
				<!-- <list-cell
					title="轴距" 
					:tips="">
				</list-cell> -->
				<list-cell
					title="整备质量(kg)" 
					:tips="StatusData.weight">
				</list-cell>
			</view>	
		</scroll-view>
		<scroll-view style="height:45vh;" v-show="currentStatus === 1"  scroll-y="true">
				<view class="scroll-view-item">
					<list-cell
						title="进气形式" 
						:tips="StatusData.intake_form">
					</list-cell>
					<list-cell
						title="气缸数" 
						:tips="StatusData.cylinder_num">
					</list-cell>
					<list-cell
						title="最大马力(Ps)" 
						:tips="StatusData.top_horsepower">
					</list-cell>
					<list-cell
						title="最大扭矩(N*m)" 
						:tips="StatusData.max_torque">
					</list-cell>
					<list-cell
						title="燃油标号" 
						:tips="StatusData.fuel_grade">
					</list-cell>
					<list-cell
						title="燃油类型" 
						:tips="StatusData.fuel_type">
					</list-cell>
					<list-cell
						title="供油方式" 
						:tips="StatusData.fuel_supp_type">
					</list-cell>
					<list-cell
						title="排放标准" 
						:tips="StatusData.env_standard">
					</list-cell>
				</view>	
		</scroll-view>
		<scroll-view style="height:45vh;" v-show="currentStatus === 2"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="驱动方式" 
					:tips="StatusData.driving_form">
				</list-cell>
				<list-cell
					title="助力类型" 
					:tips="StatusData.steering_type">
				</list-cell>	
				<list-cell
					title="前悬挂" 
					:tips="StatusData.front_suspension_type">
				</list-cell>
				<list-cell
					title="后悬挂" 
					:tips="StatusData.rear_suspension_type">
				</list-cell>
				<list-cell
					title="前制动" 
					:tips="StatusData.front_brake_type">
				</list-cell>	
				<list-cell
					title="后制动" 
					:tips="StatusData.rear_brake_type">
				</list-cell>
				<list-cell
					title="驻车制动" 
					:tips="StatusData.parking_brake_type">
				</list-cell>
				<list-cell
					title="前轮胎规格" 
					:tips="StatusData.front_tire_spec">
				</list-cell>	
				<list-cell
					title="后轮胎规格" 
					:tips="StatusData.rear_tire_spec">
				</list-cell>
			</view>	
		</scroll-view>
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
  export default {
		components: {
			listCell
		},
    data() {
      return {
				currentStatus: 0,
        StatusData:{},
      }
    },
    methods: {
			sonAssginStatus(data){
				//执行方法
				// this.StatusData=JSON.parse(val).result[0];
				this.StatusData = data;
				console.log('vin_config',this.StatusData)
			}
    }
  }
</script>
<style>
  
</style>
