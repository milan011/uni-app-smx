<template>
	<view>
		<scroll-view style="height:45vh;" v-show="currentCard === 0"  scroll-y="true">
			<view class="scroll-view-item mystyle">
				<list-cell
					title="长宽高" 
					:tips="vinData.car_length + 'cm*' + vinData.car_width + 'cm*' +vinData.car_height + 'cm'">
				</list-cell>
				<list-cell
					title="车门/车座" 
					:tips="vinData.door_num + '/' + vinData.seat_num">
				</list-cell>
				<list-cell
					title="级别" 
					:tips="vinData.car_level">
				</list-cell>
				<list-cell
					title="发动机" 
					:tips="vinData.engine">
				</list-cell>
				<list-cell
					title="最大扭矩" 
					:tips="vinData.max_torque">
				</list-cell>
				<list-cell
					title="后悬挂类型" 
					:tips="vinData.rear_suspension_type">
				</list-cell>
				<list-cell
					title="燃油类型" 
					:tips="vinData.fuel_type">
				</list-cell>
				<list-cell
					title="油耗" 
					:tips="vinData.measured_oil_consumption">
				</list-cell>
				<list-cell
					title="变速箱" 
					:tips="vinData.TM_type">
				</list-cell>
				<!-- <list-cell
					title="轴距" 
					:tips="">
				</list-cell> -->
				<list-cell
					title="整备质量(kg)" 
					:tips="vinData.weight">
				</list-cell>
			</view>	
		</scroll-view>
		<scroll-view style="height:45vh;" v-show="currentCard === 1"  scroll-y="true">
				<view class="scroll-view-item">
					<list-cell
						title="进气形式" 
						:tips="vinData.intake_form">
					</list-cell>
					<list-cell
						title="气缸数" 
						:tips="vinData.cylinder_num">
					</list-cell>
					<list-cell
						title="最大马力(Ps)" 
						:tips="vinData.top_horsepower">
					</list-cell>
					<list-cell
						title="最大扭矩(N*m)" 
						:tips="vinData.max_torque">
					</list-cell>
					<list-cell
						title="燃油标号" 
						:tips="vinData.fuel_grade">
					</list-cell>
					<list-cell
						title="燃油类型" 
						:tips="vinData.fuel_type">
					</list-cell>
					<list-cell
						title="供油方式" 
						:tips="vinData.fuel_supp_type">
					</list-cell>
					<list-cell
						title="排放标准" 
						:tips="vinData.env_standard">
					</list-cell>
				</view>	
		</scroll-view>
		<scroll-view style="height:45vh;" v-show="currentCard === 2"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="驱动方式" 
					:tips="vinData.driving_form">
				</list-cell>
				<list-cell
					title="助力类型" 
					:tips="vinData.steering_type">
				</list-cell>	
				<list-cell
					title="前悬挂" 
					:tips="vinData.front_suspension_type">
				</list-cell>
				<list-cell
					title="后悬挂" 
					:tips="vinData.rear_suspension_type">
				</list-cell>
				<list-cell
					title="前制动" 
					:tips="vinData.front_brake_type">
				</list-cell>	
				<list-cell
					title="后制动" 
					:tips="vinData.rear_brake_type">
				</list-cell>
				<list-cell
					title="驻车制动" 
					:tips="vinData.parking_brake_type">
				</list-cell>
				<list-cell
					title="前轮胎规格" 
					:tips="vinData.front_tire_spec">
				</list-cell>	
				<list-cell
					title="后轮胎规格" 
					:tips="vinData.rear_tire_spec">
				</list-cell>
			</view>	
		</scroll-view>
		<scroll-view style="height:45vh;" v-show="currentCard === 3"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="主/副驾驶安全气囊" 
					:tips="vinData.main_seat_airbag + '/' + vinData.passenger_seat_airbags">
				</list-cell>
				<list-cell
					title="前/后排气囊" 
					:tips="vinData.front_air_bag + '/' + vinData.back_air_bag">
				</list-cell>	
				<list-cell
					title="前/后排头部气囊" 
					:tips="vinData.front_head_air_bag + '/' + vinData.back_head_air_bag">
				</list-cell>
				<list-cell
					title="胎压检测" 
					:tips="vinData.tire_pressure_moni">
				</list-cell>
				<list-cell
					title="车内中控锁" 
					:tips="vinData.central_lock">
				</list-cell>	
				<list-cell
					title="儿童座椅" 
					:tips="vinData.ISOFIX_baby_seat_interface">
				</list-cell>
				<list-cell
					title="无钥匙启动" 
					:tips="vinData.keyless_boot">
				</list-cell>
				<list-cell
					title="防抱死(ABS)" 
					:tips="vinData.ABS">
				</list-cell>	
				<list-cell
					title="车身稳定控制" 
					:tips="vinData.vehicle_stability_control">
				</list-cell>
				<list-cell
					title="电动天窗" 
					:tips="vinData.electric_sunroof">
				</list-cell>
				<list-cell
					title="全景天窗" 
					:tips="vinData.pano_sunroof">
				</list-cell>	
				<list-cell
					title="电动吸合门" 
					:tips="vinData.ele_door_pull">
				</list-cell>
				<list-cell
					title="感应后备箱" 
					:tips="vinData.back_box_opening">
				</list-cell>
				<list-cell
					title="感应雨刷" 
					:tips="vinData.sens_wiper">
				</list-cell>	
				<list-cell
					title="后雨刷" 
					:tips="vinData.rear_wiper">
				</list-cell>
				<list-cell
					title="前/后电动车窗" 
					:tips="vinData.front_electric_window + '/' + vinData.back_electric_window">
				</list-cell>
				<list-cell
					title="后视镜电动调节" 
					:tips="vinData.ele_rearview_adj">
				</list-cell>	
				<list-cell
					title="后视镜加热" 
					:tips="vinData.heating_rearview">
				</list-cell>
				<list-cell
					title="多功能方向盘" 
					:tips="vinData.multi_streering_wheel_adj">
				</list-cell>
				<list-cell
					title="定速巡航" 
					:tips="vinData.cruise">
				</list-cell>	
				<list-cell
					title="后排独立空调" 
					:tips="vinData.inde_rear_aircon">
				</list-cell>
				<list-cell
					title="自动空调" 
					:tips="vinData.automatic_air_conditioning">
				</list-cell>
				<list-cell
					title="GPS导航" 
					:tips="vinData.GPS">
				</list-cell>	
				<list-cell
					title="倒车雷达" 
					:tips="vinData.after_parking_radar">
				</list-cell>
				<list-cell
					title="倒车影像" 
					:tips="vinData.reversing_video">
				</list-cell>
				<list-cell
					title="真皮座椅" 
					:tips="vinData.leather_seat">
				</list-cell>
				<list-cell
					title="前/后排座椅加热" 
					:tips="vinData.seat_heating">
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
				currentCard: 0,
        vinData:{},
      }
    },
    methods: {
			sonAssginVin(data){
				//执行方法
				// this.vinData=JSON.parse(val).result[0];
				this.vinData = data;
				console.log('vin_config',this.vinData)
			}
    }
  }
</script>
<style lang='scss' >
  .mystyle /deep/ .mix-list-cell .cell-tip {
     width:auto;
  }
</style>
