require('./index.css');
var _smc = require('util/smc.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');


//导航逻辑
var nav = {
	init : function(){
		this.bindEvent();
		// this.checkLogin();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_smc.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		//注销点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_smc.errorTips(errMsg);
			});
		});
		//头像点击事件
		$('#head-img').click(function(){
			window.location.href = './user-center.html';
		});
	},
	loadHeadImage : function(){
		_user.getUserInfo(function(res){
			// userHtml = _smc.renderHtml(templateIndex,res)
			var url = "http://img.evobly.com/img/"+ res.headImage;
			$('#head-img').attr("src",url);
			// alert(url);
		},function(errMsg){
			// $('#head-img').attr("display","hidden");
			_smc.errorTips(errMsg);
		});
	},
    // 加载用户信息
    loadUserInfo : function(){
    	_this = this;
        _user.checkLogin(function(res){
        	$('#head-img').show();
            $('.user.unlogin').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
            _this.loadHeadImage();
        }, function(errMsg){
            // do nothing
        });
    },
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$('.nav .cart-count').text(0);
		});
	}
};
module.exports = nav.init();

