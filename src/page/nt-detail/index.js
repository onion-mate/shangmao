/*
* @Author: Rosen
* @Date:   2017-05-28 19:45:49
* @Last Modified by:   luoyi
* @Last Modified time: 2017-05-29 18:39:01
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _smc             = require('util/smc.js');
var _notice        = require('service/notice-service.js');
var Pagination      = require('util/pagination/index.js');
var templateNotice   = require('./index.string');
var templateDetail   = require('./index2.string');
require('util/backTotop/index.js');

var page = {
    detaildata : {
        detailParam : {
            id              : _smc.getUrlParam('id')          || '',
            user_id         : _smc.getUrlParam('user_id')     || '',
            content         : _smc.getUrlParam('content')     || '',
            createTime     : _smc.getUrlParam('create_time') || ''
        }
    },

    noticeData : {
        listParam : {
            id              : _smc.getUrlParam('id')            || '',
            content         : _smc.getUrlParam('content')       || '',
            create_time     : _smc.getUrlParam('create_time')   || '',
            pageNum         : _smc.getUrlParam('pageNum')       || 1,
            pageSize        : _smc.getUrlParam('pageSize')      || 7
        }
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadDetails();
        this.loadNoticeList();
    },
    loadDetails : function(){
        var _this       = this,
            detailHtml    = '',
            detailParam   = this.detaildata.detailParam,
            $pDetailCon   = $('.page-wrap .w .detailCont .detail-item');
            $pDetailCon.html('<div class="loading"></div>');
        // 请求接口
        _notice.getNoticeDetail(detailParam, function(res){
            //alert(res.content);
            detailHtml = _smc.renderHtml(templateDetail, {
                list :  res
            });
            //alert(detailHtml);
            $pDetailCon.html(detailHtml);
        }, function(errMsg){
            _smc.errorTips(errMsg);
        });
    },

    loadNoticeList : function(){
        var _this       = this,
            noticeHtml    = '',
            listParam   = this.noticeData.listParam,
            $pListCon   = $('.page-wrap .w .noticeCont .notice-item .table-item');
            $pListCon.html('<div class="loading"></div>');
        // 请求接口
        _notice.getNoticeList(listParam, function(res){
            // alert(res);
            noticeHtml = _smc.renderHtml(templateNotice, {
                noticelist :  res.list
            });
            // alert(listHtml);
            $pListCon.html(noticeHtml);
            _this.loadNoticePagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
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
    page.init();
})