require('./index.css');
require('page/common/nav-simple/index.js');
var _user 	= require('service/user-service.js');
var _smc 	= require('util/smc.js');

	
//表单里错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

//page 逻辑部分
var page = {
	init : function (){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按回车键，也进行提交操作
		$('.user-content').keyup(function(e){
			//keyCode == 13 ,标识回车
			if(e.keyCode ===13){
				_this.submit();
			}
		});
	},
	//提交表单-js
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			//提交
			_user.login(formData,function(res){
				window.location.href = _smc.getUrlParam('redirect') || './index.html';
				//alert(_smc.getUrlParam('redirect'));
			},function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		if(!_smc.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_smc.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
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

