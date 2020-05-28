import * as types from '@/store/mutation-types.js'
import loginApi from '@/api/yunxiu/YXIndex/index'//登录获取基本信息
import axios from 'axios'
import native from '../native/native'
import apiServiceManager from '@/api/serviceManager'
import { hex_md5 } from '@/utils/md5'
import qs from 'qs';
const appkey ='appkey';
const AppSecret ='AppSecret';
export default{
  /**
   * vue中添加判断权限方法
   * functioncode 权限码
   * userRight 权限值 0使用1新增2打开3作废4结算5打印设置6打印7导出
   * */
  getUserRight:function (functionCode,UserRight) {
    if(!localStorage.getItem("functionData")){
      return true;
    }
    let userFunctioinData=JSON.parse(localStorage.getItem("functionData"));
    for (let fun of userFunctioinData) { // store.getters.GET_LOGIN_BASEINFO_UserFunction
      if(fun.FunctionCode==functionCode){
        return (fun.OperRight & parseInt(Math.pow(2, UserRight))) > 0;
      }
    }
    return false;
  },
  /**
   * 登录单点
   */
  loginSSO: (VUE,loginName,passWord,backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    let param={};
    param.logincode=loginName;
    param.password = passWord;
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/applogin', qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        window.localStorage.setItem("loginName", loginName);
        window.localStorage.setItem("loginPassword", passWord);
        // window.localStorage.setItem("ssoUser", JSON.stringify(response.data.user));
        // backfunction();
        apiServiceManager.getOperator({ operatorID: response.data.user.authid }).then((operData) => {//获取认证用户信息
          response.data.user.isUse = false;//顾问的在线状态
          if(operData){
            response.data.user.carOwnerNum = operData.carOwnerNum;//服务客户数
            response.data.user.state = operData.state;//顾问的在线状态
            response.data.user.isUse = true;//顾问的在线状态
          }
          window.localStorage.setItem("ssoUser", JSON.stringify(response.data.user));
          backfunction();
          native.CloseLoading();
        }).catch((error) => {
          native.CloseLoading();
          VUE.$vux.toast.text("操作有误" + error, "bottom");
        });
      }
      else {
        native.CloseLoading();
        VUE.$vux.toast.text(response.data.msg + "!", "bottom");
      }
    }).catch((error) => {
      native.CloseLoading();
      VUE.$vux.toast.text("操作有误" + error, "bottom");
      let url=window.location.href;
      if (url.indexOf('index.html') > 0) {
        url=url.split('#')[0].replace('index.html','login.html');
        // window.location.replace(url);
      }
      else{
      }
    });
  },
  /**
  * 获取单点用户信息
  */
  getUserList: (VUE, backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    // let param = new URLSearchParams();
    // param.append("logincode", JSON.parse(localStorage.getItem("ssoUser")).logincode);
    // param.append("flag", 1);
    let param = {};
    param.logincode = JSON.parse(localStorage.getItem("ssoUser")).logincode;
    param.flag = 1;
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/getUserList', qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        native.CloseLoading();
        backfunction(response.data.users);
      }
      else {
        native.CloseLoading();
        VUE.$vux.toast.text(response.data.msg + "!", "bottom");
      }
    }).catch((error) => {
      native.CloseLoading();
      VUE.$vux.toast.text("操作有误" + error, "bottom");
    });
  },
  /**
   * 获取单个用户
   */
  getUser: (VUE,loginCode, backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    // let param = new URLSearchParams();
    // param.append("logincode", loginCode);
    let param={};
    param.logincode = loginCode;
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/getUser', qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        native.CloseLoading();
        backfunction(response.data.users);
      }
      else {
        native.CloseLoading();
        VUE.$vux.toast.text(response.data.msg + "!", "bottom");
      }
    }).catch((error) => {
      native.CloseLoading();
      VUE.$vux.toast.text("操作有误" + error, "bottom");
    });
  },
  /**
   * 修改密码
   */
  modifyPwd: (VUE, oldPass,newPass, backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    let param={};
    param.logincode = JSON.parse(localStorage.getItem("ssoUser")).logincode;
    param.oldPwd = oldPass;
    param.newPwd = newPass;
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/modifyPwd', qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        native.CloseLoading();
        backfunction();
      }
      else {
        native.CloseLoading();
        VUE.$vux.toast.text(response.data.msg + "!", "bottom");
      }
    }).catch((error) => {
      native.CloseLoading();
      VUE.$vux.toast.text("操作有误" + error, "bottom");
    });
  },
  /**
   * 修改个人信息
   */
  modifyUser: (VUE,user, backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    // let param = new URLSearchParams();
    // param.append("form",JSON.stringify(user));
    let param={};
    param.form = JSON.stringify(user);
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/modifyUser',qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        native.CloseLoading();
        backfunction();
      }
      else {
        native.CloseLoading();
        VUE.$vux.toast.text(response.data.msg + "!", "bottom");
      }
    }).catch((error) => {
      native.CloseLoading();
      VUE.$vux.toast.text("操作有误" + error, "bottom");
    });
  },
  /**
   * 上传头像到单点
   */
  uploadHeadPic: (imgStr, backfunction) => {
    native.Loading();//原生加载层
    let nonce = Math.floor(Math.random() * 10000);
    let currentD = new Date().getTime();
    let param={};
    param.logincode = JSON.parse(localStorage.getItem("ssoUser")).logincode;
    param.base64Data=imgStr;
    axios.post(localStorage.getItem("SSOIP") + 'api/sso/uploadHeadPic',qs.stringify(param), {
      headers: {
        "appkey": appkey,
        "nonce": nonce,
        "curtime": currentD,
        "checksum": hex_md5(AppSecret + nonce + currentD),
      }
    }).then((response) => {
      if (response.data.code == 0) {
        native.CloseLoading();
        backfunction(response.data.msg);
      }
      else {
        native.CloseLoading();
      }
    }).catch((error) => {
      native.CloseLoading();
    });
  },
  /**
   * 登录方法(云修)
   */
  loginYX: (VUE,backfunction) => {
    loginApi.LoginYX({ "logincode":VUE.loginName, "password": VUE.loginPassword}, true).then((loginD1) => {// 利用账号密码调用模拟登录(用于本地调试) 136043836118  13731215473
      let currentProductVersion = loginD1[0];//默认首条
      if (loginD1.length>1){//数据大于1 条 判断保存的版本id
        if (localStorage.getItem("GoodsID")){
          let i = 0
          for (; i < loginD1.length;i++) {
            if (loginD1[i].GoodsID == localStorage.getItem("GoodsID")){
              currentProductVersion = loginD1[i];
              break;
            }
          }
          if (i == loginD1.length){
            VUE.$router.push({ path: "/login" });
          }
        }
        else{
          VUE.$router.push({ path: "/login" });
        }
      }
      loginApi.LoginYXAgain(currentProductVersion, true).then((loginData1) => {// 登录信息的第二次验证获取 公司等信息
        // VUE.$vux.loading.show({
        //   text: '加载中...'
        // });
        native.Loading();//原生加载层
        VUE.$store.commit(types.MUTATION_LOGIN_BASEINFO_loginMess, loginData1);// 保存登录信息
        axios.all([
          loginApi.getUserMess({ "ID": VUE.$store.state.yxBaseData.LOGIN_BASEINFO.loginMess.OperatorID }, true),
          loginApi.getUserFunction({ "RightKind": 1, "MasterID": VUE.$store.state.yxBaseData.LOGIN_BASEINFO.loginMess.OperatorID, "TypeCode": "", "type": "yunxiudx" }, true),
          loginApi.getOperatorInfo({ "OperatorID": VUE.$store.state.yxBaseData.LOGIN_BASEINFO.loginMess.OperatorID }, true),
          loginApi.getStorageList({}, true),
          loginApi.getServiceClass(),
          loginApi.getOperatorBaseInfo(),
        ]).then(axios.spread(
          (loginData, functionData, operatorData, storage,serviceClass,baseinfo)=>{//获取登录信息 和获取权限信息
            VUE.$store.commit(types.MUTATION_LOGIN_BASEINFO_loginUserinfo, loginData);//保存操作员信息  （信息较少可不用）
            localStorage.setItem("functionData", JSON.stringify(functionData));//权限信息添加到 localStorage 中
            localStorage.setItem("operatorData", JSON.stringify(operatorData));// 用户价格和系统配置信息
            localStorage.setItem("storage", JSON.stringify(storage));// 使用仓库信息
            localStorage.setItem("serviceClass", JSON.stringify(serviceClass));// 仓库信息
            localStorage.setItem("operatorbaseinfo", JSON.stringify(baseinfo));// 操作员信息（信息较多有法人配置等）系统参数设置
            // VUE.$vux.loading.hide();
            native.CloseLoading();
            backfunction();
          }), err => {

            native.CloseLoading();
            VUE.$vux.toast.text('发生错误' + err, 'bottom');
            VUE.$router.push({path:"/login"});
          }
          )
          .catch((error) => {

            native.CloseLoading();
            VUE.$vux.toast.text('发生错误:' + error, 'bottom');
            VUE.$router.push({path:"/login"});
          });
      });
    });
  },
}
