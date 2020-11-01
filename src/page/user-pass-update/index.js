
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _smc = require('util/smc.js');
var _user = require('service/user-service.js');


//page 逻辑部分
var page = {
	init : function (){
		this.onLoad();
		this.bindEvent();

	},
	onLoad : function(){
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password 	 	: $.trim($('#password').val()),
				passwordNew 	: $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_smc.successTips(msg);
					window.location.href = './user-login.html';
				},function(errMsg){
					_smc.errorTips(errMsg);
				});
			}else{
				_smc.errorTips(validateResult.msg);
			}
		});
	},
	validateForm : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		
		if(!_smc.validate(formData.password,'require')){
			result.msg = '原密码不能为空！';
			$('#password').addClass('errorSelected');
			$('#password').focus();
			return result;
		}else{
			$('#password').removeClass('errorSelected');
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度不能小于6位';
			$('#password-new').addClass('errorSelected');
			$('#password-new').focus();
			return result;
		}else{
			$('#password-new').removeClass('errorSelected');
		}
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次密码不一致';
			$('#password-confirm').addClass('errorSelected');
			$('#password-confirm').focus();
			return result;
		}else{
			$('#password-confirm').removeClass('errorSelected');
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
