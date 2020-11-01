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
	data : {
		username : '',
		question : '',
		answer 	 : '',
		token  	 : ''
	},
	init : function (){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名后下一步操作
		$('#submit-username').click(function(){
			var username = $('#username').val();
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入用户名！');
			}
		});
		//输入密保答案后下一步操作
		$('#submit-question').click(function(){
			var answer = $('#answer').val();
			//如果答案存在
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer 	 : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入密保答案！');
			}
		});
		//输入新密码后的点击事件
		$('#submit-password').click(function(){
			var password = $('#password').val();
			//如果密码不为空则提交
			if(password && password.length >= 6){
				_user.resetPassword({
					username 	: _this.data.username,
					passwordNew : password,
					forgetToken	: _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入不少于6位的密码！');
			}
		});
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
		//加载输入密保答案
	loadStepQuestion : function(){
		formError.hide();//隐藏错误提示部分
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
		$('.step-question').show();
	},
		//加载输入用户密码
	loadStepPassword : function(){
		formError.hide();//隐藏错误提示部分
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
	
};

$(function(){
	page.init();
});















