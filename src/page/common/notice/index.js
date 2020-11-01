
'use strict';
require('./index.css');
var _notice 		= require('service/notice-service.js');
var Pagination      = require('util/pagination/index.js');
var templateNotice   = require('./index.string');
var _smc = require('util/smc.js');


var notice = {
    noticeData : {
        listParam : {
            id         : _smc.getUrlParam('id')     || '',
            content         : _smc.getUrlParam('content')     || '',
            create_time      : _smc.getUrlParam('create_time') || '',
            pageNum         : _smc.getUrlParam('pageNum')    || 1,
            pageSize        : _smc.getUrlParam('pageSize')   || 7
        }
    },
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
        this.loadNoticeList();
	},
    loadNoticeList : function(){
        var _this       = this,
            noticeHtml    = '',
            listParam   = this.noticeData.listParam,
            $pListCon   = $('.info-list');
            $pListCon.html('<div class="loading"></div>');
        // 请求接口
        _notice.getNoticeList(listParam, function(res){
            // alert(res);
            noticeHtml = _smc.renderHtml(templateNotice, {
                noticelist :  res.list
            });
            // alert(listHtml);
            $pListCon.html(noticeHtml);
            // _this.loadNoticePagination({
            //     hasPreviousPage : res.hasPreviousPage,
            //     prePage         : res.prePage,
            //     hasNextPage     : res.hasNextPage,
            //     nextPage        : res.nextPage,
            //     pageNum         : res.pageNum,
            //     pages           : res.pages
            // });
        }, function(errMsg){
            _smc.errorTips(errMsg);
        });
    },
	//加载分页信息
	loadNoticePagination : function(pageInfo){
		var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination-notice'),
            onSelectPage : function(pageNum){
                _this.noticeData.listParam.pageNum = pageNum;
                _this.loadNoticeList();
            }
        }));
	}
};
$(function(){
	notice.init();
})