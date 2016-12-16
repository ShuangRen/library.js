/**
 * 微信jssdk 提供多种常用sdk调用
 * 2016-10-31 by yinhuang
 */
import jwx from './jweixin.js';
const weixin = {
    name:'wxsdk',
    val: {
        config:'',
        is_getWxConfig: false,
        Utils:'',
        _str:'',
        _value:'',
        _config: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'hideMenuItems',
            'chooseWXPay'
        ]
    },
    //微信对象本体
    wx(str, value) {
        if(!jwx) {
            alert('微信SDK发生错误,请稍后再试!');
            return;
        }
        if(str == 'apiList') {
            this.val._config.push(value);
            return this;
        }

        if(str == 'use') {
            this.val.Utils = value;
            return this;
        }
        if(str == 'getConfig') {
            this.getConfig(this._getConfig);
            return this;
        }

        this.val._str = str;
        this.val._value = value;

        if(!this.val.is_getWxConfig) {
            this._getConfig(jwx);
        }else {
           this._wxApi(jwx);
        }
	},

    //得到配置项
    _getConfig (value) {
        this.val.is_getWxConfig = true;

        this._wxGo(value, jwx);

        // this.val.Utils.ajax({
        //     reqData: [{
        //     'method': 'wechat.get_j_s_signature',
        //     'params': {
        //         url: window.location.href
        //     }
        //     }]
        // })
        // .then(function(err, res)  {
        //     if(res && res.result) {

        //     this._wxGo(res, wx);

        //     }else if(res && res.error) {
        //     this.val.is_getWxConfig = false;
        //         return {};
        //     }

        // })
    },

    //设置 api
    _wxGo(res, wx) {
        wx.config({
            debug: false,
            appId: res.result.appId,
            timestamp: res.result.timestamp,
            nonceStr: res.result.nonceStr,
            signature: res.result.signature,
            jsApiList: this.val._config
        });
        wx.ready(function () {
            this._wxApi(wx);
        });
        wx.checkJsApi({
            jsApiList: this.val._config, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                //console.log(res)
                //alert(JSON.stringify(res))
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
    },


  _wxApi(wx) {
    switch(this.val._str) {
      //分享
      case 'share' :
        wx.onMenuShareTimeline(this.val._value);
        wx.onMenuShareAppMessage(this.val._value);
        wx.onMenuShareQQ(this.val._value);
        wx.onMenuShareWeibo(this.val._value);
        wx.onMenuShareQZone(this.val._value);
        break;
      //隐藏按钮
      case 'hide' :
        wx.hideOptionMenu();
        break;
      //显示按钮
      case 'show' :
        wx.showOptionMenu();
        break;
      //关闭页面
      case 'close' :
        wx.closeWindow();
        break;
      //隐藏菜单
      case 'menu' :
        wx.hideMenuItems({
          menuList: this.val._value // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
        break;
      case 'pay' :
        wx.chooseWXPay(this.val._value);
      //其他的接口 直接返回 wx对象本身
      case 'other' :
        return wx;
    }
  },
  _wxGetConfig() {
      
  }
}

export default {
    wx:weixin.wx
}