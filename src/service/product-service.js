var _smc = require('util/smc.js');
var _product = {
    // 用户登录
    getProductList : function(listParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/product/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    getSecProductList : function(listParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/product/sec_list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }

}
	module.exports = _product;
