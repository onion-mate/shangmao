

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');


var _smc             = require('util/smc.js');
var _user = require('service/user-service.js');
var _message       = require('service/message-service.js');
var Pagination      = require('util/pagination/index.js');
var templateMessage   = require('./index.string');
require('util/backTotop/index.js');


//表单里错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
var page = {

    detaildata : {
        detailParam : {
            id              : _smc.getUrlParam('id')          || '',
            user_id         : _smc.getUrlParam('user_id')     || '',
            content         : _smc.getUrlParam('content')     || '',
            createTime     : _smc.getUrlParam('create_time') || ''
        }
    },

    messageData : {
        listParam : {
            id              : _smc.getUrlParam('id')            || '',
            username        : _smc.getUrlParam('username')      || '',
            content         : _smc.getUrlParam('content')       || '',
            createTime     	: _smc.getUrlParam('createTime')   	|| '',
            totalNum	    : _smc.getUrlParam('total')   		|| 0,
            pageNum         : _smc.getUrlParam('pageNum')       || 1,
            pageSize        : _smc.getUrlParam('pageSize')      || 5
        }
    },
    init : function(){
        //this.onLoad();
        this.loadMessageList();
        // this.loadUserInfo();
        this.bindEvent();
        // var msgItem=document.getElementsByClassName("msg-item");
        // alert(msgItem.length);
    },
    // onLoad : function(){
    //     // this.loadDetails();

    // },
    // loadDetails : function(){
    //     var _this       = this,
    //         detailHtml    = '',
    //         detailParam   = this.detaildata.detailParam,
    //         $pDetailCon   = $('.page-wrap .panel .panel-body .msg-item');
    //         $pDetailCon.html('<div class="loading"></div>');
    //     // 请求接口
    //     _message.getMessageDetail(detailParam, function(res){
    //         //alert(res.content);
    //         detailHtml = _smc.renderHtml(templateDetail, {
    //             list :  res
    //         });
    //         //alert(detailHtml);
    //         $pDetailCon.html(detailHtml);
    //     }, function(errMsg){
    //         _smc.errorTips(errMsg);
    //     });
    // },
 	bindEvent : function(){
		var _this = this;
		//发表留言按钮
		$('#submit').click(function(){
			_this.submit();
		});

		// //如果按回车键，也进行提交操作
		// $('.user-content').keyup(function(e){
		// 	//keyCode == 13 ,标识回车
		// 	if(e.keyCode ===13){
		// 		_this.submit();
		// 	}
		// });
	},
	//提交表单-js
	submit : function(){
		var _this = this;
		_this.loadUserInfo();
		_user.checkLogin(function(res){
			var formData = {
			userId 		: res.id,
			userName 	: res.username,
			content 	: $.trim($('#msgArea').val())
		},
		//表单验证
		validateResult = _this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			//提交
			_message.addMessage(formData,function(res){
				$('#msgArea').val("");
				$(function(){
	                 $("html,body").animate({
	                 scrollTop: 0,
	                 screenLeft: 0,
	                }, 400); 
	         	});
				alert("留言发表成功！");
				_this.loadMessageList();
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
		},function(errMsg){
			//do nothing
		});
	},
	//表单字段的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		if(!_smc.validate(formData.content,'require')){
			result.msg = '留言信息不能为空';
			$('#msgArea').addClass('errorSelected');
			$('#msgArea').focus();
			return result;
		}else{
			$('#msgArea').removeClass('errorSelected');
		}
		if(formData.content.length > 150){
			result.msg = '留言内容不超过150个字符';
			$('#msgArea').addClass('errorSelected');
			$('#msgArea').focus();
			return result;
		}else{
			$('#msgArea').removeClass('errorSelected');
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	},
	loadUserInfo : function(){
		_user.getUserInfo(function(res){
		},function(errMsg){
			_smc.errorTips(errMsg);
		});
	},
    // 加载留言列表
    loadMessageList : function(pageNum){
        var _this       = this,
            messageHtml    = '',
            listParam   = this.messageData.listParam,
            $pListCon   = $('.page-wrap .panel .panel-body');
            $pListCon.html('<div class="loading"></div>');
        // 请求接口
        _message.getMessageList(listParam, function(res){
            // alert(res.total);
			messageHtml = _smc.renderHtml(templateMessage, {
	            messagelist : res.list
            });
            //alert(listHtml);
            $pListCon.html(messageHtml);
            _this.loadMessagePagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });

            var msgItem=document.getElementsByClassName("msg-item");
        	for(var i = 0; i < msgItem.length; i ++){
               	msgItem[i].setAttribute("data-index", i+1);
               	var floornum = msgItem[i].getAttribute("data-index");
               	var times = Math.ceil(res.total/5);
               	// pageNum=1;

    //          for(pageNum = 1;pageNum <= times;pageNum++){
				var iNum=document.getElementsByClassName("floor");

               	for(var i = 0; i < iNum.length; i ++){
               		var floors = i+1;
               		var times = res.total/5;
               		if(pageNum !=null && pageNum !=""){
               			floors += (pageNum-1)*5;
               			iNum[i].innerHTML = "#"+floors+"&nbsp;";
               		}else{
               			iNum[i].innerHTML = "#"+floors+"&nbsp;";
               		}
               		
               		// if(pageNum>1 && pageNum<=2){
               		// 	floors += 5;
               		// 	iNum[i].innerHTML = floors;
               		// }else if(pageNum>2 && pageNum<=3){
               		// 	floors += 2*5;
               		// 	iNum[i].innerHTML = floors;
               		// }else if(pageNum>3 && pageNum<=4){
               		// 	floors += 3*5;
               		// 	iNum[i].innerHTML = floors;
               		// }else if(pageNum>4 && pageNum<=5){
               		// 	floors += 4*5;
               		// 	iNum[i].innerHTML = floors;
               		// }else if(pageNum>5 && pageNum<=6){
               		// 	floors += 5*5;
               		// 	iNum[i].innerHTML = floors;
               		// }else{
               		// 	iNum[i].innerHTML = floors;
               		// }
               		// $('.floor').html(floors);
           		}
               	// alert(floornum);
           	}
        }, function(errMsg){ 
            _smc.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadMessagePagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination-message'),
            onSelectPage : function(pageNum){
                _this.messageData.listParam.pageNum = pageNum;
                _this.loadMessageList(pageNum);
            }
        }));
    }
};
$(function(){
    page.init();
})