var _smc = require('util/smc.js');
var _notice = {
    // 用户登录
    getNoticeList : function(listParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/notice/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    getNoticeDetail : function(detailParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/notice/detail.do'),
            data    : detailParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
    // getNoticeDetail : function(productId, resolve, reject){
    //     _smc.request({
    //         url     : _smc.getServerUrl('/notice/detail.do'),
    //         data    : {
    //             id : id
    //         },
    //         success : resolve,
    //         error   : reject
    //     });
    // }

}
	module.exports = _notice;
