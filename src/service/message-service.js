var _smc = require('util/smc.js');
var _message = {
    // 用户登录
    getMessageList : function(listParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/message/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检查登录状态
    checkLogin : function(resolve,reject){
        _smc.request({
            url     : _smc.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    addMessage : function(msgInfo,resolve,reject){
        _smc.request({
            url     : _smc.getServerUrl('/message/add.do'),
            data    : msgInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getMessageDetail : function(detailParam, resolve, reject){
        _smc.request({
            url     : _smc.getServerUrl('/message/detail.do'),
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
	module.exports = _message;
