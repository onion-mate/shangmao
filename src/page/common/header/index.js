require('./index.css');
var _smc = require('util/smc.js');

//通用页面header开发
var header = {
	init : function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad : function(){
		var keyword = _smc.getUrlParam('keyword');
		//如果存在关键字，则回填搜索框信息
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		$('#search-input').focus(function(){
			if($(this).focus){
				$('#search-input').addClass('search-input-actived');
				$('#search-input').removeAttr("placeholder");
			}
		});
		$('#search-input').blur(function(){
			if($(this).blur){
				$('#search-input').removeClass('search-input-actived');
				$('#search-input').attr("placeholder","请输入商品名称");
			}
		});
		//点击搜索按钮后的动作
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车提交的功能
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提价时有关键字，则正常跳转到列表页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果keyword为空，返回主页
		else{
			_smc.goHome();
		}
	}
};
header.init();