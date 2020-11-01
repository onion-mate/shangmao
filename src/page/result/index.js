require('./index.css');
require('page/common/nav-simple/index.js');
var _smc = require('util/smc.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');


$(function(){
	var type = _smc.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的操作结果
	$element.show();
});

/*var result = {
	init : function(){
		this.bindEvent();
		return this;
	},
	bindEvent : function(){
		//注销点击事件
		$('.js-login').click(function(){
			_user.logout(function(res){
				window.location.href = './user-login.html';
			},function(errMsg){
				_smc.errorTips(errMsg);
			});
		});
	}
};
module.exports = result.init();*/
