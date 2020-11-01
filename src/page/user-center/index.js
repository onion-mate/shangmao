
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _smc = require('util/smc.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');





//page 逻辑部分
var page = {
	init : function (){
		this.onLoad();
	},
	onLoad : function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _smc.renderHtml(templateIndex,res)
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_smc.errorTips(errMsg);
		});
	}
};

$(function(){
	page.init();
});
