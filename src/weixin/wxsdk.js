;(function(exports) {
  var _config,
      is_getWxConfig = false,
      Utils,
      _str,
      _value;



  _config = [
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
  ];


  //微信对象本体
  var wxsdk = function(wx) {
    if(!wx) {
      alert('微信SDK发生错误,请稍后再试!');
      return;
    }
    return function (str, value) {
        if(str == 'apiList') {
            _config.push(value);
            return this;
        }

        if(str == 'use') {
          Utils = value;
          return this;
        }

        _str = str;
        _value = value;

        if(!is_getWxConfig) {
          _getConfig(wx);
        }else {
          _wxApi(wx);
        }
    }

	};

  //得到配置项
  var _getConfig = function (wx) {
    is_getWxConfig = true;
      Utils.ajax({
        reqData: [{
          'method': 'wechat.get_j_s_signature',
          'params': {
            url: window.location.href
          }
        }]
      })
      .then(function(err, res)  {
        if(res && res.result) {

          _wxGo(res, wx);

        }else if(res && res.error) {
          is_getWxConfig = false;
            return {};
        }

      })
  }

  //设置 api
  var _wxGo = function (res, wx) {
      wx.config({
        debug: false,
        appId: res.result.appId,
        timestamp: res.result.timestamp,
        nonceStr: res.result.nonceStr,
        signature: res.result.signature,
        jsApiList: _config
      });
      wx.ready(function () {
        _wxApi(wx);
      });
      wx.checkJsApi({
          jsApiList: _config, // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
            //console.log(res)
            //alert(JSON.stringify(res))
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
      });
  }


  var  _wxApi = function (wx) {
    switch(_str) {
      //分享
      case 'share' :
        wx.onMenuShareTimeline(_value);
        wx.onMenuShareAppMessage(_value);
        wx.onMenuShareQQ(_value);
        wx.onMenuShareWeibo(_value);
        wx.onMenuShareQZone(_value);
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
          menuList: _value // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
        break;
      case 'pay' :
        wx.chooseWXPay(_value);
      //其他的接口 直接返回 wx对象本身
      case 'other' :
        return wx;
        break;
    }
  }



  //模块化返回
  if (typeof define === 'function' && define.amd) { /* AMD support */
		define('wx', ['jweixin'], function(sdk) {

			return wxsdk(sdk);
      //return function () {};
		});
	} else {
		exports.wx = wxsdk(window.wx&&window.wx);
	}
})(this);
