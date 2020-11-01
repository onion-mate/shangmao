
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
		this.bindEvent();
	},
	onLoad : function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone 	 : $.trim($('#phone').val()),
				email 	 : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer 	 : $.trim($('#answer').val()),
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res,msg){
					_smc.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_smc.errorTips(errMsg);
				});
			}else{
				_smc.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _smc.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_smc.errorTips(errMsg);
		});
	},
	validateForm : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		
		if(!_smc.validate(formData.phone,'phone')){
			result.msg = '请检查手机号格式';
			$('#phone').addClass('errorSelected');
			$('#phone').focus();
			return result;
		}else{
			$('#phone').removeClass('errorSelected');
		}
		if(!_smc.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			$('#email').addClass('errorSelected');
			$('#email').focus();
			return result;
		}else{
			$('#email').removeClass('errorSelected');
		}
		if(!_smc.validate(formData.question,'require')){
			result.msg = '密保问题不能为空';
			$('#question').addClass('errorSelected');
			$('#question').focus();
			return result;
		}else{
			$('#question').removeClass('errorSelected');
		}
		if(!_smc.validate(formData.answer,'require')){
			result.msg = '密保答案不能为空';
			$('#answer').addClass('errorSelected');
			$('#answer').focus();
			return result;
		}else{
			$('#answer').removeClass('errorSelected');
		}


		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});
