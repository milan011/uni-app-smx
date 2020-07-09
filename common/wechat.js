//weixin-js-sdk应用
const wx = require('weixin-js-sdk')
// import { Toast } from 'mint-ui'
// import store from "@/store/index";
// import * as types from "@/store/mutation-types.js";
import { getWechatInfo  } from '@/api/weChat.js';
export default {
  methods: {
    wechatShare(info) {
      // 判断苹果手机
      // let _url = 'http://tcl.simaxian.com/gzh/cylb/index.html'
      // let _url = 'http://www.tclgzh.net/'
      // let _url = _url = window.location.href.split('#')[0] || window.location.href
      let _url = ''
      if (window.__wxjs_is_wkwebview === true) {
        _url = window.location.href.split('#')[0] || window.location.href
      } else {
        _url = window.location.href
      } 
      console.log(_url)
      getWechatInfo({ url: encodeURIComponent(_url) }).then(res => {
        /*console.log(2)
        console.log(res)*/
        const wechatInfo = res.data.Data
        wx.config({
            debug: true,
            /*appId: 'wx195ad83501ef1dab', // 必填，公众号的唯一标识
            timestamp: 1577695466, // 必填，生成签名的时间戳
            nonceStr: 'sdfsdkfsdfksjoeigerk', // 必填，生成签名的随机串
            signature: '75f74c42cf01f8de505f6ceaa6e610795d910260', // 必填，签名，见附录1*/
            appId: wechatInfo.appId, // 必填，公众号的唯一标识
            timestamp: wechatInfo.timestamp, // 必填，生成签名的时间戳
            nonceStr: wechatInfo.nonceStr, // 必填，生成签名的随机串
            signature: wechatInfo.signature, // 必填，签名，见附录1
            jsApiList: [
              'previewImage',
              'hideAllNonBaseMenuItem',
              'showMenuItems',
							"updateAppMessageShareData",
							"updateTimeLineShareData",
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseWXPay',
              'scanQRCode'
            ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
          })
      })
      // 访问后台接口获取微信参数
      /*this.$store
        .dispatch('GetWxParam', { url: encodeURIComponent(_url) })
        .then(res => {
          console.log(res)
          wx.config({
            debug: false,
            appId: 'wx195ad83501ef1dab', // 必填，公众号的唯一标识
            timestamp: 1577695466, // 必填，生成签名的时间戳
            nonceStr: 'sdfsdkfsdfksjoeigerk', // 必填，生成签名的随机串
            signature: '75f74c42cf01f8de505f6ceaa6e610795d910260', // 必填，签名，见附录1
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: [
              'previewImage',
              'hideAllNonBaseMenuItem',
              'showMenuItems',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseWXPay'
            ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
          })
        })
        .catch(err => {
          console.log(err)
        })*/
      wx.ready(() => {
        const share_title = info.title
        const share_desc = info.desc
        const share_link = info.link
        const share_img = info.img
        wx.showOptionMenu()
        wx.onMenuShareTimeline({
          title: share_desc, // 分享标题
          desc: share_desc, // 分享描述
          link: share_link, // 分享链接
          // link: window.location.href.split('#')[0]+'?#'+window.location.href.split('#')[1],
          imgUrl: share_img, // 分享图标
          success: function() {
            // console.log('圈')
            // console.log(share_link)
            // alert(share_link)
            // Toast('已成功分享到朋友圈')
          },
          cancel: function() {
            // Toast('已取消分享')
          }
        })
        wx.onMenuShareAppMessage({
          title: share_title, // 分享标题
          desc: share_desc, // 分享描述
          link: share_link, // 分享链接
          // link: window.location.href.split('#')[0]+'?#'+window.location.href.split('#')[1],
          imgUrl: share_img, // 分享图标
          success: function() {
            // console.log('友')
            // console.log(share_link)
            // alert(share_link)
            // Toast('已成功分享给您的朋友')
          },
          cancel: function() {
            // Toast('已取消分享')
          }
        })
      })
    }
  }
}