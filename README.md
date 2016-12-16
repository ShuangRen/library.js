# library.js

# About 
## html  import

```html
<script src="/library/build/library.js"></script>
<script>
	L.isArray([]);
</script>
```
## ES6 import
```javascript
import L form '/library/build/library.js';
L.isArray([]);
```
## AMD import
```javascript
let L = require('/library/build/library.js');
L.isArray([]);
```
## Release notes
#### now:
1. Function library fn related all kinds of judgment and validation 
	函数库 fn 相关 各种判断和验证
	
2. WeChat SDK
   微信SDK封装

#### future:
1. Simple dom manipulation
    简单的dom操作
2. components on mobile
   移动端各种组件

##  document
http://library.webzeal.cn

## npm  install
npm install library

#### version 1.0


# Function library
rovides many methods used to determine or verify a few things
提供了许多方法用来判断或者验证一些东西

### isFunction
> L.isFunction(arg)  
> verify is function returns a Boolean value of true or fals
> 验证是否为函数 返回布尔值 true or false

```javascript
	var a = function () {return 1+2};
	var b = 'abc';
	L.isFunction(a) //return true
	L.isFunction(b) //return false
```

### isObject
> L.isObject(arg) 
> verify whether return Boolean values true or false for the object
> 验证是否为对象 返回布尔值 true or false

```javascript
	var a = new Object();
	var b = function () {return 1+2};
	L.isObject(a) //return true
	L.isObject(b) //return false
```

### isArray
> L.isArray(arg) 
> verify for array return Boolean values true or false
> 验证是否为数组 返回布尔值 true or false

```javascript
	var a = [1,2,3];
	var b = function () {return 1+2};
	L.isArray(a) //return true
	L.isArray(b) //return false
```

### isString
> L.isString(arg) 
> verify whether as a string Returns a Boolean value of true or false
> 验证是否为字符串 返回布尔值 true or false

```javascript
	var a = 'abc';
	var b = function () {return 1+2};
	L.isString(a) //return true
	L.isString(b) //return false
```

### isJson
> L.isJson(arg) 
> verify as JSON return Boolean values true or false
> 验证是否为JSON 返回布尔值 true or false

```javascript
	var a = {a:1, b:2};
	var b = function () {return 1+2};
	L.isJson(a) //return true
	L.isJson(b) //return false
```

### isEmpty
> L.isEmpty(arg) 
> 
> verify whether is empty Returns a Boolean value of true or false 
> according to Array, JSON, the String returned by the authentication method is not the same
> 
> 验证是否为空 返回布尔值 true or false 
>  针对 Array, JSON, String 返回的验证方式是不一样的

```javascript
	var json1 = {a:1, b:2};
	var json2 = {};
	var arr1 = [1,2,3];
	var arr2 = [];
	var str1 = 'abc';
	var str2 = '';
	var func = function(){};
	var obj= new Object();
	
	L.isEmpty(json1) //return false
	L.isEmpty(json2) //return true
	
	L.isEmpty(arr1) //return false
	L.isEmpty(arr2) //return true
	
	L.isEmpty(str1) //return false
	L.isEmpty(str2) //return true
	 
	//function 以及 object 无论何时皆返回false
	L.isEmpty(func) //return false
	L.isEmpty(obj) //return false
```

### isWeixin
> L.isWeixin(arg) 
> validation is in WeChat environment return Boolean values true or false
> 验证是是在微信环境中 返回布尔值 true or false

### isIos
> L.isIos(arg) 验证是是在IOS环境中 返回布尔值 true or false

### use
> L.use(obj, obj) 
> merger of two objects and returns a new object
> 合并2个对象并返回新对象
```javascript
	var a = {a:1, b:2};
	var b = {c:3}
	var newObj = L.use(a, b)
	console.log(newObj) // {a:1, b:2, c:3}
```

### isIdCard
> L.isIdCard(num) 
> validation id number correctly returns true or false
> 验证身份证号码是否正确 返回 true false

### isChinese
> L.isChinese(num) 
> verify whether Chinese returns true or false
> 验证是否是汉字 返回 true false

### getQueryString
> L.getQueryString(name) 
> returns the value of the url query name as key values
> 返回 url 的query的值 name为key值
```javascript
	//urlquery = name=abc&age=12
	L.getQueryString(name) //return abc
	L.getQueryString(age) //return 12
```

# WeiChat SDK

### step one  config

>  Request wx config parameters
>  请求wx的config参数

```javascript
   L.wx('getConfig', function (Fn) {
		ajax({
	        success:function (res) {
				 Fn&&Fn(res);
			}
        })
   })
``` 
### share

> This method to synthesize call WeChat SDK onMenuShareTimeline, onMenuShareAppMessage, onMenuShareQQ, onMenuShareWeibo, onMenuShareQZone
> 
> 此方法合成调用了微信sdk 的 onMenuShareTimeline, onMenuShareAppMessage, onMenuShareQQ, onMenuShareWeibo, onMenuShareQZone

```javascript
   L.wx('share', {
        title: '',//分享标题
		link: window.location.href, //当前页面url
		imgUrl: '', //分享图标的url
		success: function(){},//分享成功的回调 (这里做一些比如分享后可查看之类的需求的时候就用到了)
		cancel: function(){},//取消分享的回调
		fail: function(){} //分享出错/失败 的回调
   });
```   
   
### hide   Hide the upper right corner of the menu

> This method of synthetic calls the hideOptionMenu WeChat SDK
> 此方法合成调用了微信sdk 的 hideOptionMenu

```javascript
   L.wx('hide');
```

### show   Show the upper right corner of the menu

> This method of synthetic calls the showOptionMenu WeChat SDK
> 此方法合成调用了微信sdk 的 showOptionMenu

```javascript
   L.wx('show');
```

### close 
Close the current page (directly exit WeChat browser)  
关闭当前页面 (直接退出微信浏览器)

> This method to synthesize to invoke the closeWindow WeChat SDK
> 此方法合成调用了微信sdk 的 closeWindow

```javascript
   L.wx('close');
```

### menu Hide certain specified menu 指定隐藏某些菜单

> This method of synthetic calls the hideMenuItems WeChat SDK
> 此方法合成调用了微信sdk 的 hideMenuItems

> [All menu list see WeChat public platform official documents](http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html#.E9.99.84.E5.BD.953-.E6.89.80.E6.9C.89.E8.8F.9C.E5.8D.95.E9.A1.B9.E5.88.97.E8.A1.A8)
> [所有菜单列表见微信公众平台官方文档](http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html#.E9.99.84.E5.BD.953-.E6.89.80.E6.9C.89.E8.8F.9C.E5.8D.95.E9.A1.B9.E5.88.97.E8.A1.A8)

#### commonly used menu 常用菜单有:

* 发送给朋友: "menuItem:share:appMessage"
* 分享到朋友圈: "menuItem:share:timeline"
* 分享到QQ: "menuItem:share:qq"
* 分享到Weibo: "menuItem:share:weiboApp"
* 分享到 QQ 空间/menuItem:share:QZone
* 复制链接: "menuItem:copyUrl"
* 在QQ浏览器中打开: "menuItem:openWithQQBrowser"
* 在Safari中打开: "menuItem:openWithSafari"



```javascript
   L.wx('close',[
        'menuItem:share:appMessage',
        'menuItem:share:qq'
   ]);
```

### WeiChat Pay 微信支付

```javascript
   L.wx('pay', {
     timestamp: item.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
     nonceStr: item.nonceStr, // 支付签名随机串，不长于 32 位
     package: item.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
     signType: item.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
     paySign: item.paySign, // 支付签名
     success: function (res) {},
     error: function (res) {},
   });
```
# Dom manipulation

### L selector  L 选择器
>L. (selecter) support # id. Class target, etc., internal call querySelectorAll
> L.(selecter) 支持 #id .class target 等,内部调用的querySelectorAll
> 
> Don't need to care about querySelectorAll array, DOM methods automatically filter multiple list
> 不需要在意querySelectorAll 的 数组, DOM 方法会自动过滤多个list 的情况

```javascript
	L('#abc'); //return elementList
	L('.abc'); //return elementList
	L('div'); //return elementList
```

### css
> css(name, value)
> If only by name to get the value for the set, the set will return after this used for subsequent chain calls
> 若只有name为get 有value为set, set后会return this 用作后续链式调用

```javascript
	L('#abc').css('display', 'block'); //return this(L本身)
	L('.abc').css('display', 'block'); // 所有 className为 abc 的element 都会 block  return this(L本身)
	L('div').css('display'); //return element 的 第1个 的 display (这里只取行间, 若不在行间 则 返回 L本身)
```

### clas
> clas(str, value) str supoort    add,       remove,       has,       get
> clas(str, value) str 支持    add,       remove,       has,       get

```javascript
	L('#abc').clas('get'); //获取 #abc 元素的所有className
	L('.abc').clas('has', 'className1'); // 获取 .abc 的元素的第一个 是否存在 className1 这个 class
	L('div').clas('add', 'name2'); //为所有div 添加 name2 的 className  return this
	L('div').clas('remove', 'name2'); //为所有div 移除 name2 的 className  return this 
```

