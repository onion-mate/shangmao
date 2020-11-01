

var Hogan = require('hogan.js');
//工具类
var conf = {
	serverHost : ''
};
var _smc = {
	//网络请求
	request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            async		: false,
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
	},
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
	//渲染html模板 使用Hogan组件
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
		result = template.render(data);
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '啊哦，好像哪儿出问题了呀-o-！');
	},
	//字段的验证方法，支持是否为空、手机号、邮箱。。
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//手机验证
		if('phone' === type){
			var phoneText = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
			return phoneText.test(value);
			// return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			var emailText = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			return emailText.test(value);
			// return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
		}
	},
	//同意登录处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	}
};

module.exports = _smc;