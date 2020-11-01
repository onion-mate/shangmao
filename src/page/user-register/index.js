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
		//异步验证用户名
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			if(!username){//用户名为空则不验证
				return;
			}
			//异步验证用户是否存在
			_user.checkUsername(username,function(res){
				formError.hide();
				$('#username').removeClass('errorSelected');
			},function(errMsg){
				formError.show(errMsg);
				$('#username').focus();
				$('#username').addClass('errorSelected');
			});
		});
		//注册按钮
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
			username 		: $.trim($('#username').val()),
			password 		: $.trim($('#password').val()),
			phone 			: $.trim($('#phone').val()),
			email 			: $.trim($('#email').val()),
			question 		: $.trim($('#question').val()),
			answer 			: $.trim($('#answer').val()),
			passwordConfirm : $.trim($('#password-confirm').val())
		},
		//表单验证
		validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			//提交
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
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
			$('#username').addClass('errorSelected');
			$('#username').focus();
			return result;
		}else{
			$('#username').removeClass('errorSelected');
		}
		if(!_smc.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			$('#password').addClass('errorSelected');
			$('#password').focus();
			return result;
		}else{
			$('#password').removeClass('errorSelected');
		}
		if(formData.password.length < 6){
			result.msg = '密码长度不小于6位';
			$('#password').addClass('errorSelected');
			$('#password').focus();
			return result;
		}else{
			$('#password').removeClass('errorSelected');
		}
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次密码不一致';
			$('#password-confirm').addClass('errorSelected');
			$('#password-confirm').focus();
			return result;
		}else{
			$('#password-confirm').removeClass('errorSelected');
		}
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

