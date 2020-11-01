/*
* @Author: Rosen
* @Date:   2017-06-06 09:25:41
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-09 19:49:33
*/

'use strict';
var _smc = require('util/smc.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;
