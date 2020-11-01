/*
* @Author: Rosen
* @Date:   2017-05-28 19:45:49
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-29 18:39:01
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _smc             = require('util/smc.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');
require('util/backTotop/index.js');

var page = {
    data : {
        productId : _smc.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        $(document).ready(function () {
            $.goup({
                trigger: 100,
                bottomOffset: 150,
                locationOffset: 100,
                title: '回到顶部',
                titleAsText: true
            });
        });
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _smc.goHome();
        }
        this.loadDetail();

    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _smc.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap .w');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _smc.renderHtml(templateIndex, res);
            $pageWrap.html(html);
            if(res.p_type == "1"){
                //$(".p-type-con").css({ display: "block"});
                $(".p-type-con .info").html("该商品为主卖商品");
            }else{
                $(".p-type-con .info").html("该商品为二手交易商品");
            }
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})