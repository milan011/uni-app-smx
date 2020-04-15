<template>
	<view>
		<scroll-view  v-show="currentStatus === 0"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="疑似泡水车检查" 
					:navigateType="StatusData.HasDpCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasDpCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasDpCheck ? '良好' : '优秀'">
				</list-cell>			
				<list-cell
					title="疑似火烧车检查" 
					:navigateType="StatusData.HasFireCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasFireCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasFireCheck ? '良好' : '优秀'">
				</list-cell>	
				<list-cell
					title="疑似重大事故车检查" 
					:navigateType="StatusData.HasSgCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasSgCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasSgCheck ? '良好' : '优秀'">
				</list-cell>	
			</view>	
		</scroll-view>
		<scroll-view v-show="currentStatus === 1"  scroll-y="true">
				<view class="scroll-view-item">
					<list-cell
						title="外观检查" 
						:navigateType="StatusData.HasWgCheck ? 'waring' : 'success'"
						:iconRightColor="StatusData.HasWgCheck ? '#aa5500' : '#06c638'"
						:tips="StatusData.HasWgCheck ? '良好' : '优秀'">
					</list-cell>
					<list-cell
						title="驾驶舱检查" 
						:navigateType="StatusData.HasJscCheck ? 'waring' : 'success'"
						:iconRightColor="StatusData.HasJscCheck ? '#aa5500' : '#06c638'"
						:tips="StatusData.HasJscCheck ? '良好' : '优秀'">
					</list-cell>
					<list-cell
						title="发动机舱检查" 
						:navigateType="StatusData.HasFdjCheck ? 'waring' : 'success'"
						:iconRightColor="StatusData.HasFdjCheck ? '#aa5500' : '#06c638'"
						:tips="StatusData.HasFdjCheck ? '良好' : '优秀'">
					</list-cell>
					<list-cell
						title="底盘检查" 
						:navigateType="StatusData.HasDpCheck ? 'waring' : 'success'"
						:iconRightColor="StatusData.HasDpCheck ? '#aa5500' : '#06c638'"
						:tips="StatusData.HasDpCheck ? '良好' : '优秀'">
					</list-cell>
				</view>	
		</scroll-view>
		<scroll-view  v-show="currentStatus === 2"  scroll-y="true">
			<view class="scroll-view-item">
				<list-cell
					title="动力性检测" 
					:navigateType="StatusData.HasDlCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasDlCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasDlCheck ? '良好' : '优秀'">
				</list-cell>
				<list-cell
					title="制动性检测" 
					:navigateType="StatusData.HasZdCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasZdCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasZdCheck ? '良好' : '优秀'">
				</list-cell>
				<list-cell
					title="操控性检测" 
					:navigateType="StatusData.HasCkCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasCkCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasCkCheck ? '良好' : '优秀'">
				</list-cell>
				<list-cell
					title="安全性检测" 
					:navigateType="StatusData.HasAqCheck ? 'waring' : 'success'"
					:iconRightColor="StatusData.HasAqCheck ? '#aa5500' : '#06c638'"
					:tips="StatusData.HasAqCheck ? '良好' : '优秀'">
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
