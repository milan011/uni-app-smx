<template>
	<view class="protocol-detail-main">
		<view class="headers">
			<image src="../../../static/protocol/logo.jpg" mode=""></image>
			<view class="num">
				编号：<text style="color: red;">{{formdata.code}}</text>
			</view>
		</view>
		<view class="protocol-main">
			<view class="title">二手车交易合同</view>
			<view class="main">
				<view class="row">卖方（以下简称甲方）：<text class="red">{{formdata.s_name}}</text></view>
				<view class="row">证件名称及号码：<text class="red">{{formdata.s_cert_type}} {{formdata.s_cert_number}}</text></view>
				<view class="row">甲方代理人：<text class="red">{{formdata.s_proxy?formdata.s_proxy:"无"}}</text></view>
				<view class="row">身份证号码：<text class="red">{{formdata.s_proxy_certnumber?formdata.s_proxy_certnumber:"无"}}</text></view>
				<view class="row" style="margin-top: 20upx;">买方（以下简称乙方）：<text class="red">{{formdata.b_name}}</text></view>
				<view class="row">证件名称及号码：<text class="red">{{formdata.b_cert_type}} {{formdata.b_cert_number}}</text></view>
				<view class="row">乙方代理人：<text class="red">{{formdata.b_proxy?formdata.b_proxy:"无"}}</text></view>
				<view class="row">身份证号码：<text class="red">{{formdata.b_proxy_certnumber?formdata.b_proxy_certnumber:"无"}}</text></view>
				<view class="row" style="margin-top: 20upx;">丙方：<text class="red">{{formdata.p_name}}</text></view>
				<view class="row" style="margin: 20upx 0; font-weight: 600;">交易车辆基本情况</view>
				<view class="row">产权登记人：<text class="red">{{formdata.propertyown}}</text></view>
				<view class="row">车辆类型：<text class="red">{{carType[formdata.cartype]}}</text></view>
				<view class="row">车牌号码：<text class="red">{{formdata.carnumber}}</text></view>
				<view class="row">厂牌型号：<text class="red">{{formdata.carmodel}}</text></view>
				<view class="row">初次登记日期：<text class="red">{{formdata.carmodel}}</text></view>
				<view class="row">发动机号：<text class="red">{{formdata.enginecode}}</text></view>
				<view class="row">车架号：<text class="red">{{formdata.vin}}</text></view>
				<view class="row">保险有效期至：<text class="red">{{formdata.endinsuredate.substring(0,formdata.endinsuredate.indexOf('T'))}}</text></view>
				<view class="row">最近一次年检时间：<text class="red">{{formdata.lastcheckdate.substring(0,formdata.lastcheckdate.indexOf('T'))}}</text></view>
				<view class="row">颜色：<text class="red">{{outcolorConfig[formdata.bodycolor].name}}</text></view>
				<view class="row">车辆使用性质：<text class="red">{{carNature[formdata.carnature-1]}}</text></view>
				<view class="row" style="margin: 20upx 0; font-weight: 600;">其他根据旧机动车现状及交易的实际情况，经甲乙双方协商一致，资源达成如下协议：</view>
				<view class="row" style="font-weight: 600;">第一条 声明保证</view>
				<view class="row" style="margin-top: 20upx;">1、甲方应当保证对出卖车辆享有所有权或处分权且该车符合国家有关可以上路或交易的规定，保证该车辆能依法办理过户、转籍手续。</view>
				<view class="row" style="margin-top: 20upx;">2、甲方保证向乙方提供的车辆相关凭证真实、有效、合法，并对所出售的车辆描述的车况和信息无隐瞒或欺骗，并确认丙方所发布或出售的的车辆信息与自己描述的情况一致。</view>
				<view class="row" style="margin-top: 20upx;">3、甲方或者乙方不得跳过丙方进行私下交易，因此造成的一切损失由甲、乙双方自行承担。</view>
				<view class="row" style="margin-top: 20upx;">4、乙方应对所购买的的车辆的车况、手续、信息等方面做充分了解后签约，签约即视为已认可或接受车辆状况。</view>
				<view class="row" style="margin-top: 20upx;">5、车辆在办理过户、转籍过程中，因车辆使用发生交通事故的，由使用人承担相关法律责任。</view>
				<view class="row" style="margin-top: 20upx;">6、甲乙双方同意，甲方按《二手车评估收费标准》向丙方支付评估服务费用，乙方向丙方支付信息服务费用，信息服务费用按照成交金额的2%收取，成交价格低于5万元的，按1000元收取。</view>
				<view class="row" style="margin-top: 20upx;">7、甲方或其代理人拥有该车辆合法处分权，对车辆信息做了充分披露；若因信息披露过错造成交易失败导致丙方损失的，由甲方或其代理人承担。</view>
				<view class="row" style="margin-top: 20upx;">8、丙方仅提供二手车供求信息，并对评估的车辆状况如实告诉双方，做到车况同名。签订正式合同前，甲乙双方应对车辆信息及车况进行详细了解，建议甲乙双方对车辆进行专业检测。</view>
				<view class="row" style="margin-top: 20upx;">9、若车辆有其他共有人的，甲方对车辆进行处分时，必须经其他共有人同意，因此造成的损失由甲方承担。</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">第二条 交易保证</view>
				<view class="row" style="margin-top: 20upx;">乙方自愿向丙方支付交易保证金人民币<text class="red">{{formdata.s_margin}}</text>
					元(不低于成交价4%)，大写<text class="red">{{formdata.s_margin_dx}}</text>元。甲方选择以下方式保证合同履行（在选择的方式中打√）：
				</view>
				<view class="row" style="margin-top: 20upx;">
					<text v-if="formdata.b_marginType" style="padding-right:10upx">☐</text>
					<text v-if="!formdata.b_marginType" style="padding-right:10upx">☑</text>
					1）甲方自愿向丙方支付交易保证金人民币
					<text class="red">
						{{!formdata.b_marginType?formdata.b_margin:"————"}}
					</text>元(不低于成交价4%)，大写
					<text class="red">{{!formdata.b_marginType?formdata.b_margin_dx:"————"}}</text>元
				</view>
				<view class="row" style="margin-top: 20upx;">
					<text v-if="!formdata.b_marginType" style="padding-right:10upx">☐</text>
					<text v-if="formdata.b_marginType" style="padding-right:10upx">☑</text>
					2）甲方自愿向丙方支付（<text class="red">{{formdata.b_marginType?formdata.b_marginType:"————"}}</text>），作为售车保证。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">第三条 签约方式约定及后续流程（在选择的方式中打√并相应填写）</view>
				<view class="row" style="margin-top: 20upx;">
					<text v-if="formdata.contractway==1" style="padding-right:10upx">☐</text>
					<text v-if="formdata.contractway==0" style="padding-right:10upx">☑</text>
					第一种：甲乙双方自行交付各类款项的，丙方不负责后续产生的一切损失及风险，由此造成的一切损失及风险由甲乙双方自行承担。
				</view>
				<view class="row" style="margin-top: 20upx;">
					<text v-if="formdata.contractway==1" style="padding-right:10upx">☑</text>
					<text v-if="formdata.contractway==0" style="padding-right:10upx">☐</text>
					第二种：委托丙方代结算
				</view>
				<view class="row" style="margin: 20upx 0;">
					1、车辆无抵押
				</view>
				<view class="row" style="margin-top: 20upx;">
					乙方在签订合同
					<text class="red">{{formdata.p_way==2||formdata.contractway==0?"————":formdata.p_way_1_day}}</text>
					日内付清全部车款人民币
					<text class="red">
						{{formdata.p_way==2||formdata.contractway==0?"————":formdata.p_way_1_money}}
					</text>
					元（大写）给丙方，丙方在收到乙方全部车款后三日内支付甲方人民币
					<text class="red">
						{{formdata.p_way==2||formdata.contractway==0?"————":formdata.p_way_1_money_b}}
					</text>
					元（大写），在办理过户手续完成后
					<text class="red">
						{{formdata.p_way==2||formdata.contractway==0?"————":formdata.p_way_1_day_b}}
					</text>
					工作日内支付余款
					<text class="red">
						{{formdata.p_way==2||formdata.contractway==0?"————":formdata.p_way_1_lastmoney}}
					</text>元（大写）。
				</view>
				<view class="row" style="margin: 20upx 0;">
					2、车辆有抵押
				</view>
				<view class="row" style="margin-top: 20upx;">
					乙方在签订合同
					<text class="red">
						{{formdata.p_way==1||formdata.contractway==0?"————":formdata.p_way_2_day}}
					</text>
					日内付清全部车款人民币
					<text class="red">
						{{formdata.p_way==1||formdata.contractway==0?"————":formdata.p_way_2_money}}
					</text>
					元（大写）给丙方，甲方向丙方支付解押保证金人民币
					<text class="red">
						{{formdata.p_way==1||formdata.contractway==0?"————":formdata.p_way_2_margin}}
					</text>
					元（大写），解除车辆抵押登记后，丙方向甲方支付购车款人民币
					<text class="red">
						{{formdata.p_way==1||formdata.contractway==0?"————":formdata.p_way_2_money_b}}
					</text>
					元（大写），车辆过户登记办理完毕后，丙方向甲方支付购车款人民币
					<text class="red">
						{{formdata.p_way==1||formdata.contractway==0?"————":formdata.p_way_2_lastmoney}}
					</text>元（大写）。
				</view>
				<view class="row" style="margin: 20upx 0;">
					双方自行约定办理过户手续
				</view>
				<view class="row" style="margin: 20upx 0 0;">
					1、甲乙双方协商同意在
					<!-- <text class="red">
						{{formdata.days}}
					</text> -->
					<text class="red">
						{{formdata.starttime.year}}
					</text>年
					<text class="red">
						{{formdata.starttime.month}}
					</text>月
					<text class="red">
						{{formdata.starttime.day}}
					</text>日至
					<text class="red">
						{{formdata.endtime.year}}
					</text>年
					<text class="red">
						{{formdata.endtime.month}}
					</text>月
					<text class="red">
						{{formdata.endtime.day}}
					</text>日）办理过户转籍等相关手续。）过户手续由
					<text class="red">
						{{formdata.assigned}}
					</text>
					方负责办理，另外一方须积极配合办理车辆的过户、转籍。
				</view>
				<view class="row" style="margin: 20upx 0 0;">
					2、在过户期间内，出现意外情况，需要丙方延长付款期限的，应由甲乙双方出具书面的委托书，因车辆过户产生的相关风险、损失和由此产生的交易纠纷由甲乙双方自行承担。
				</view>
				<view class="row" style="margin-top: 20upx;">
					第四条 交易相关费用结算方式
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					1、交易佣金为人民币
					<text class="red">
						{{formdata.commission}}
					</text>
					元，由甲方承担
					<text class="red">
						{{formdata.s_assume}}
					</text>
					元，由乙方承担
					<text class="red">
						{{formdata.b_assume}}
					</text>元。代办
					<text v-if="formdata.forcommission.indexOf('违章')==-1">☐</text>
					<text v-if="formdata.forcommission.indexOf('违章')>-1">☑</text>
					违章、
					<text v-if="formdata.forcommission.indexOf('年检')==-1">☐</text>
					<text v-if="formdata.forcommission.indexOf('年检')>-1">☑</text>
					年检、
					<text v-if="formdata.forcommission.indexOf('过户')==-1">☐</text>
					<text v-if="formdata.forcommission.indexOf('过户')>-1">☑</text>
					过户等服务费合计人民币
					<text class="red">
						{{formdata.servermoney}}
					</text>元，由
					<text class="red">
						{{formdata.serveruser}}
					</text>承担；以上两项费用应于
					<text class="red">
						{{formdata.serverovertime.year}}
					</text>年
					<text class="red">
						{{formdata.serverovertime.month}}
					</text>月
					<text class="red">
						{{formdata.serverovertime.day}}
					</text>日付清。
				</view>
				<view class="row" style="margin-top: 20upx;">
					2、其他费用（{{formdata.othercost?formdata.othername:"————"}}）
					<text class="red">
						{{formdata.othercost?formdata.othermoney:"————"}}
					</text>
					元，由甲方承担
					<text class="red">
						{{formdata.othercost?formdata.othermoney_b:"————"}}
					</text>
					元，由乙方承担
					<text class="red">
						{{formdata.othercost?formdata.othermoney_s:"————"}}
					</text>
					元；过户费用据实结算为人民币
					<text class="red">
						{{formdata.othercost?formdata.assignmoney:"————"}}
					</text>元，由
					<text class="red">
						{{formdata.othercost?formdata.assignuser:"————"}}
					</text>方承担；以上费用应于
					<text class="red">
						{{formdata.assigndatetime?formdata.assigndatetime.year:"————"}}
					</text>年
					<text class="red">
						{{formdata.assigndatetime?formdata.assigndatetime.month:"————"}}
					</text>月
					<text class="red">
						{{formdata.assigndatetime?formdata.assigndatetime.day:"————"}}
					</text>日付清。
				</view>
				<view class="row" style="margin-top: 20upx;">
					3、在甲乙双方产生违约事项导致本合同无法执行或单方面解释合同的情况下，丙方暂停代收代付委托，乙方委托丙方代收代付的款项中未实际支付的剩余款项，根据双方的协商结果或法院出具的法律文书进行返还或支付。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第五条 车辆支付
				</view>
				<view class="row" style="margin-top: 20upx;">
					1、支付时间约定为在
					<text class="red">
						{{formdata.getcartime?formdata.getcartime.year:""}}
					</text>年
					<text class="red">
						{{formdata.getcartime?formdata.getcartime.month:""}}
					</text>月
					<text class="red">
						{{formdata.getcartime?formdata.getcartime.day:""}}
					</text>日
					<text class="red">
						{{formdata.getcartime?formdata.getcartime.hour:""}}
					</text>时
					<text class="red">
						{{formdata.getcartime?formdata.getcartime.minute:""}}
					</text>分
				</view>
				<view class="row" style="margin-top: 20upx;">
					2、交付项目：
					<text v-if="formdata.getcarcontent.indexOf('车辆本身')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('车辆本身')>-1">☑</text>
					车辆本身、
					<text v-if="formdata.getcarcontent.indexOf('机动车行驶证')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('机动车行驶证')>-1">☑</text>
					机动车行驶证、
					<text v-if="formdata.getcarcontent.indexOf('机动车保险单')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('机动车保险单')>-1">☑</text>
					机动车保险单、
					<text v-if="formdata.getcarcontent.indexOf('身份证复印件')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('身份证复印件')>-1">☑</text>
					身份证复印件（{{formdata.cert_numbe}}）张、
					<text v-if="formdata.getcarcontent.indexOf('钥匙')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('钥匙')>-1">☑</text>
					钥匙（{{formdata.key_number}}）把、
					<text v-if="formdata.getcarcontent.indexOf('机动车登记证书')==-1">☐</text>
					<text v-if="formdata.getcarcontent.indexOf('机动车登记证书')>-1">☑</text>
					机动车登记证书。
				</view>
				<view class="row" style="margin-top: 20upx;">
					3、责任约定：支付之前，该车所产生的所有税金、规费和路面风险、刑事、民事等法律责任由甲方承担；交付之后，该车所产生的所有税金、规费和路面风险、刑事、民事等法律责任由乙方承担。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第六条 保险过户
				</view>
				<view class="row" style="margin-top: 20upx;">
					<text v-if="!formdata.issureone">☐</text>
					<text v-if="formdata.issureone">☑</text>
					交强险过户，车辆过户后，由乙方带过户资料三个工作日去保险公司过户，如不及时过户，由此造成的一切损失及风险由乙方自行承担。</p>
					<text v-if="!formdata.issuretwo">☐</text>
					<text v-if="formdata.issuretwo">☑</text>
					商业险过户，车辆过户后，乙方预约甲方，甲乙双方须积极配合办理商业险的过户，三个工作日内去保险公司过户（乙方带过户资料，甲方携带身份证）如不及时过户，由此造成的一切损失及风险由违约方自行承担。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第七条 违约责任
				</view>
				<view class="row" style="margin-top: 20upx;">
					①签订合同后，甲方不得将该车辆出售给他人；否则视为违约，应向乙方支付违约金，违约金额与乙方交纳的保证金数额一致。
				</view>
				<view class="row" style="margin-top: 20upx;">
					②交付车辆后，甲方必须保证该车辆状况不发生重大变化，并对车辆及附件的完整性负责，否则视为违约，应向乙方支付违约金，违约金数额与乙方交纳的保证金数额一致。
				</view>
				<view class="row" style="margin-top: 20upx;">
					③在合同约定期限内，乙方必须按照本合同约定购买该车辆，否则视为违约，应当向甲方支付违约金，违约金额与其交纳的保证金额一致。
				</view>
				<view class="row" style="margin-top: 20upx;">
					④甲方未按照约定支付车辆或相关证件的，每逾期一日按车款总价0.3%的标准向乙方支付违约金，乙方未按照约定期限支付款项并接受车辆的，乙方自违约之日起，每逾期一日按车款总价0.3%的标准向甲方支付违约金。
				</view>
				<view class="row" style="margin-top: 20upx;">
					⑤违约方应向守约方及丙方支付违约金，丙方有权优先扣除成交额的2%（不低于1000元）作为丙方损失交易服务费用的补偿，剩余部分给守约方。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第八条 合同解除
				</view>
				<view class="row" style="margin-top: 20upx;">
					（一）乙方解除合同
				</view>
				<view class="row" style="margin-top: 20upx;">
					1、在发生下列情况时，乙方有权单方面解除合同：（1）在车辆交付时，车辆状况发生重大改变（如出险、事故等）。（2）车辆无法过户或转籍的（含验车不能通过的）。（3）过户期间，乙方发现甲方有故意隐瞒重大车况问题，并提供充分证据。
				</view>
				<view class="row" style="margin-top: 20upx;">
					2、责任处理：解除合同后，乙方将车辆退还给甲方，甲方将车款全额退还乙方；产生的相关费用由甲方承担。
				</view>
				<view class="row" style="margin-top: 20upx;">
					（二）甲方解除合同
				</view>
				<view class="row" style="margin-top: 20upx;">
					1、在发生下列情况时，甲方有权单方面解除合同：（1）因乙方原因导致车辆在约定期限内不能办理过户、转籍手续的。（2）乙方未按照约定时间支付合同款项。
				</view>
				<view class="row" style="margin-top: 20upx;">
					2、责任处理，按乙方违约处理，相关费用由乙方承担。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第九条 合同争议解决办法
				</view>
				<view class="row" style="margin-top: 20upx;">
					本合同项下发生的争议，由甲乙双方当事人协商或者依法向合同旅行地或丙方所在人民法院提起民事诉讼。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第十条 其他约定事项
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第十一条
				</view>
				<view class="row" style="margin-top: 20upx;">
					如本合同与交易市场提供的合同范本不一致时，以本合同为准。
				</view>
				<view class="row" style="margin-top: 20upx;font-weight: 600;">
					第十二条
				</view>
				<view class="row" style="margin-top: 20upx;">
					本合同一式四份，签约地点
					<text class="red">
						{{formdata.signadress}}
					</text>
					。甲方、乙方各执一份，丙方执贰分。本合同经叁方签字之日起生效。合同生效后，叁方对合同的变更或补充应采取书面形式确定为本合同的附件，本合同有同等的法律效力。
				</view>
				<view>
					<view style="margin-top: 60upx;">
						<view>甲方签字（盖章）：</view>
						<view>电话：</view>
					</view>
					<view style="margin-top: 20upx;">
						<view>乙方签字（盖章）：</view>
						<view>电话：</view>
					</view>
					<view style="margin-top: 20upx;">
						<view>丙方签字（盖章）：</view>
						<view>电话：</view>
					</view>
					<view style="margin-top: 20upx;">签订时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
					</view>
				</view>
			</view>
		<view class="padding flex flex-direction">
			<view class="cu-btn bg-red lg" @tap="doDel">删除</view>
		</view>
		</view>
	</view>
</template>

<script>
	import {deleteContract} from "@/api/contract.js"
	import '@/common/utils'
	export default {
		data() {
			return {
				outcolorConfig : [
					{key: 0, name: '其它'},
					{key: 1, name: '黑'},
					{key: 2, name: '白'},
					{key: 3, name: '银白'},
					{key: 4, name: '红'},
					{key: 5, name: '蓝'},
					{key: 6, name: '银'},
					{key: 7, name: '橙'},
					{key: 8, name: '深灰'},
					{key: 9, name: '香槟金'},
					{key: 10, name: '灰'},
					{key: 11, name: '棕'},
					{key: 12, name: '绿'},
					{key: 13, name: '紫'},
				],
				formdata: {
					code: "000003",
					s_name: "张三", //甲方姓名
					s_cert_type: "身份证", //甲方证件类型
					s_cert_number: 130162198806066623, //甲方身份证号码
					s_proxy: "", //甲方代理人
					s_proxy_certnumber: "", //甲方代理人的证件
					b_name: "李四", //乙方姓名
					b_cert_type: "身份证", //乙方证件类型
					b_cert_number: "130110198502023312", //乙方身份证号码
					b_proxy: "", //乙方代理人
					b_proxy_certnumber: "", //乙方代理人证件
					p_name: "上海大众工业集团", //丙方
					propertyown: "王五", //产权登记人
					cartype: "轿车", //车辆类型
					carnumber: "冀A RX456", //车牌号
					carmodel: "大众", //厂牌型号
					enginecode: "r564214", //发动机号
					vin: "QWF125V46123478F", //车架号
					endinsuredate: "", //有效期年检
					bodycolor: "红色", //颜色
					carnature: "私家车", //车辆使用性质
					s_margin: "100", //甲方保证金
					b_marginType: "车辆登记书",
					b_margin: "", //乙方保证金
					contractway: 0,
					p_way: 0,
					p_way_1_money: "",
					p_way_1_lastmoney: "",
					p_way_1_money_b: "",
					p_way_1_day_b: "",
					p_way_2_day: "",
					p_way_2_money: "",
					p_way_2_margin: "",
					p_way_2_money_b: "",
					p_way_2_lastmoney: "",
					days: "1", //协商几日内
					starttime: "2019-12-17T15:52:14", //开始年月日
					endtime: "2019-12-17T15:52:14", //结束年月日
					assigned: "丙", //办理方
					commission: "1000", //交易佣金金额
					s_assume: "500", //甲方承担金额
					b_assume: "500", //乙方承担金额
					forcommission: "", //代办
					servermoney: "200", //代办费用
					serveruser: "张三", //代办费用承担人
					serverovertime: "", //代办费用付清时间
					othercost: "",
					othername: "",
					othermoney: "", //其他费用
					othermoney_b: "", //乙方承担的其他费用
					othermoney_s: "", //甲方承担的
					assignmoney: "", //过户费
					assignuser: "", //承担过户费方
					assigndatetime: "2019-12-17T15:52:14", //其他费用结清时间
					getcartime: "2019-12-17T15:52:14", //支付时间
					getcarcontent: "", //交付项目
					cert_numbe: "", //身份证复印件
					key_number: "", //钥匙数量
					issureone: true, //过户方式
					signadress: "石家庄市", //签约地址
				},
				carType:['不限','轿车','SUV','面包车','客车','货车','MPV'],
				carNature:['私用','公用/商务','运营']
			};
		},
		onLoad() {
			var _this = this
			uni.getStorage({
				key:'contractDetail',
				success:(res)=>{
					console.log('协议详情', res.data)
					_this.formdata = res.data
					const daxie = _this.$utils.DX(2410)
					console.log('大写金额2410',daxie)		
					
					_this.formdata.s_margin_dx = _this.$utils.DX(_this.formdata.s_margin)
					_this.formdata.b_margin_dx = _this.$utils.DX(_this.formdata.b_margin)
					_this.formdata.p_way_1_money = _this.$utils.DX(_this.formdata.p_way_1_money)
					_this.formdata.p_way_1_money_b = _this.$utils.DX(_this.formdata.p_way_1_money_b)
					_this.formdata.p_way_1_lastmoney = _this.$utils.DX(_this.formdata.p_way_1_lastmoney)
					_this.formdata.p_way_2_money = _this.$utils.DX(_this.formdata.p_way_2_money)
					_this.formdata.p_way_2_margin = _this.$utils.DX(_this.formdata.p_way_2_margin)
					_this.formdata.p_way_2_money_b = _this.$utils.DX(_this.formdata.p_way_2_money_b)
					_this.formdata.p_way_2_lastmoney = _this.$utils.DX(_this.formdata.p_way_2_lastmoney)
	
					console.log(_this.formdata.s_margin_dx)
					_this.formdata.starttime = _this.$utils.dateFormat(_this.formdata.starttime)
					_this.formdata.endtime = _this.$utils.dateFormat(_this.formdata.endtime)
					_this.formdata.serverovertime = _this.$utils.dateFormat(_this.formdata.serverovertime)
					_this.formdata.getcartime = _this.$utils.dateFormat(_this.formdata.getcartime)
					// _this.formdata.getcarcontent = _this.$utils.dateFormat(_this.formdata.getcarcontent)
					// console.log('格式化时间',_this.$utils)
					
					
				}
			})
		},
		methods:{
			doDel(){
				let that = this
				uni.showModal({
				    title: '是否删除?',
				    content: '确定删除此条合同吗?注：删除后将无法恢复!',
				    success: function (res) {
				        if (res.confirm) {
				            deleteContract({id:that.formdata.id}).then(res=>{
								uni.showToast({
									title:'删除成功',
									icon:'success',
									duration:1500
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.protocol-detail-main {
		width: 90%;
		margin: 0 auto;

		.red {
			color: red;
			text-decoration: underline;
		}

		.headers {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90upx;

			image {
				width: 30%;
				height: 100%;
			}

			.num {
				font-size: 32upx;
			}
		}

		.protocol-main {
			.title {
				height: 100upx;
				font-size: 44upx;
				text-align: center;
				line-height: 100upx;
			}

			.main {
				.row {
					font-size: 26upx;
				}
			}
		}
	}
</style>
