
// var dsBridge=require("dsbridge3.0")
var dsBridge=require("dsbridge")
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
if(isIOS){
  // dsBridge=require("dsbridge2.0")
  dsBridge=require("dsbridge")
}
// import userFunction  from "@/common/userFunction";
// import axios from 'axios';
/* const handlerPic = (backFunction, pathType, picData)=>{
    let dataURL =  "data:image/png;base64,"+picData;
    let imgData = picData;
    if (pathType == 'uploadHeadPic') {// 上传头像
      userFunction.uploadHeadPic(dataURL, backFunction);
    }
    else if (pathType == 'sendMessPic'){//发送云信图片消息
      backFunction(dataURL);
    }
    else {
      let reqParam = {
        picCode: imgData,
        picType: 'jpg'
      };
      let reqParams = {
        "data": reqParam,
        "extra": "",
        "clienttype": "app",
        "sessionid": "4965ee17-2b16-11e7-a290-005056a81ee6"
      };
       let params=JSON.stringify(reqParams)
      axios.post(localStorage.getItem("yunxiuIP") + 'img/' + pathType, params)
        .then(function (response) {
          backFunction(response.data.discussionId);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
} */
export default {
  
  //车牌识别
  CarCode: (backFunction) => {
    debugger;
    dsBridge.call("CarCode",backFunction);
  },
  ScanCode: (backFunction) => {
    dsBridge.call("ScanCode",backFunction);
  },
  CarRunRead: (backFunction) => {
    dsBridge.call("CarRunRead",backFunction);
  },
  //VIN识别
  VINCode: (backFunction) => {
    dsBridge.call("VINCode",backFunction);
  },
  //经纬度
  LatAndLon: (backFunction) => {
    dsBridge.call("LatAndLon",backFunction);
  },
  //打开地图
  OpenMap: (backFunction,code) => {
    dsBridge.call("OpenMap",{ code: code },backFunction);
  },
  //语音开始
  Voice: (backFunction) => {
    dsBridge.call("Voice",backFunction);
  },
  VoiceCancel: (backFunction) => {
    dsBridge.call("VoiceCancel",backFunction);
  },
  VoiceStop: (backFunction) => {
    dsBridge.call("VoiceStop",backFunction);
  },
  //接口
  Interface: (backFunction) => {
    dsBridge.call("Interface",backFunction);
  },
  //缓存功能
  Storage: (backFunction) => {
    dsBridge.call("Storage",backFunction);
  },
  //更新
  Update: (backFunction,code) => {
    dsBridge.call("Update",{ code: code },backFunction);
  },
  //热更新
  HotUpdate: (backFunction) => {
    dsBridge.call("HotUpdate",backFunction);
  },
  //推送信息
  PushInfo: (backFunction) => {
    dsBridge.call("PushInfo",backFunction);
  },
  /*
  * 调用 原生图片 拍照
  * */
  // Picture: (backFunction, pathType='AppIndex') => {
  //   dsBridge.call("Picture",(picData)=>{ handlerPic(backFunction, pathType,picData);});
  // },

    Picture: (backFunction) => {
      dsBridge.call("Picture", backFunction);
  },

  WxLogin: (backFunction) => {
    dsBridge.call("WxLogin", backFunction);
  },

  WxShare: (backFunction, data) => {
    dsBridge.call("WxShare",data, backFunction);
  },
  RecordingVideo: (backFunction, data) => {
    dsBridge.call("RecordingVideo", data, backFunction);
  },
  playVideo: (backFunction, data) => {
    dsBridge.call("playVideo", data, backFunction);
  },
  /*
 * 调用 原生图片 打电话
 * */
  Mobile: (backFunction, code) => {
    dsBridge.call("Mobile",{ code: code },backFunction);
  },
  /**
   * 显示原生的loading 层
   */
  Loading:()=>{
    dsBridge.call("Loading");
  },
  PlayHintSound:()=>{
    dsBridge.call("PlayHintSound");
  },

  /**
   * 关闭原生的loading 层
   */
  CloseLoading: () => {
    dsBridge.call("CloseLoading");
  },

  //退出云信
  LoginOut:()=>{
    dsBridge.call("LoginOut");
  },
  //传值给原生
  LoginComplete:(code)=>{
    dsBridge.call("LoginComplete",{ code: code });
  },

  // //原生调js
  // testJsApiNoArgs: () => {
  //   alert(666)
  //   dsBridge.register('testJsApiNoArgs', function () {
  //     return "45345";
  //   });
  // },
  // testJsApiWithArgs: () => {
  //   dsBridge.register('testJsApiWithArgs', function (a,b) {
  //     return a+b;
  //   });
  // },
}
//原生调js
dsBridge.register('testJsApiNoArgs', function () {
  return "45345";
});
dsBridge.register('testJsApiWithArgs', function (a,b) {
  return a+b;
});
