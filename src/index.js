import func from './func/func.js';
import weixin from './weixin/weixin.js';
import dom from './dom/dom.js';

var shuangren = function (selecter) {
    return new dom(selecter);
};

shuangren.__proto__ = Object.assign(func, weixin);

window.L = shuangren;

module.exports = shuangren;
