
'use strict';
require('./index.css');
require('./head/cropper.min.css');
require('./head/sitelogo.css');
require('./head/jquery.min.js');
require('./head/bootstrap.min.js');
require('./head/cropper.js');
require('./head/sitelogo.js');
require('./html2canvas.min.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _smc = require('util/smc.js');
var _user = require('service/user-service.js');


//page 逻辑部分
var page = {
	init : function (){
		this.onLoad();
		this.bindEvent();

	},
	onLoad : function(){
		_this = this;
		navSide.init({
			name : 'user-headimg-update'
		});
				//头像点击事件
		// $('#head-img').src="";
		$('#avatarInput').on('change', function(e) {
			var filemaxsize = 1024 * 3;//3M
			var target = $(e.target);
			var Size = target[0].files[0].size / 1024;
			if(Size > filemaxsize) {
				alert('请上传3M以内大小的图片!');
				$(".avatar-wrapper").childre().remove;
				return false;
			}
			if(!this.files[0].type.match(/image.*/)) {
				alert('请选择正确的图片!')
			} else {
				var filename = document.querySelector("#avatar-name");
				var texts = document.querySelector("#avatarInput").value;
				var teststr = texts; //你这里的路径写错了
				var testend = teststr.match(/[^\\]+\.[^\(]+/i); //直接完整文件名的
				 // alert(texts);
				filename.innerHTML = testend;
			}
		});
		
	},
	dataURLtoFile : function(dataurl, filename = 'file') {
	  let arr = dataurl.split(',')
	  let mime = arr[0].match(/:(.*?);/)[1]
	  let suffix = mime.split('/')[1]
	  let bstr = atob(arr[1])
	  let n = bstr.length
	  let u8arr = new Uint8Array(n)
	  while (n--) {
	      u8arr[n] = bstr.charCodeAt(n)
	  }
	  return new File([u8arr], `${filename}.${suffix}`, {
	      type: mime
	  })
	},
	imagesAjax : function(src){
		var imgInfo;
		// var data = {};
		// var img_file = document.getElementById("avatarInput");
		// var fileObj = img_file.files[0];
		// data.img = src;
		// data.jid = $('#jid').val();
		if ($("#avatarInput").val() == '') {
            return;
        }
		var formData = new FormData();
		var fileObj = src;
		formData.append("upload_file",fileObj);
		$.ajax({
			url: _smc.getServerUrl("/user/upload.do"),
			data: formData,
			async:false,
			type: "POST",
			// dataType: 'json',
			contentType: false,
            processData: false,
			success: function(res) {
				if(res.status == '0') {
					imgInfo = res.data.uri;
					// alert("头像名称："+res.data.uri +"\n"+ "ftp服务器图片存址："+res.data.url);
					// $('.user_pic img').attr('src',res.data.url);
					// $('#head-img').attr('src','res.data.uri');
					// alert("头像更新成功！");
				}
			}
		});
		return imgInfo;
	},
	bindEvent : function(){
		var _this = this;
		$(".avatar-save").on("click", function() {
			var img_lg = document.getElementById('imageHead');
			// 截图小的显示框内的内容
			html2canvas(img_lg, {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas) {
					canvas.id = "mycanvas";
					//生成base64图片数据
					var dataUrl = canvas.toDataURL("image/gif,image/jpeg,image/jpg,image/png");
					//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
					// var newImg = document.createElement("img");
					// newImg.src = dataUrl;
				    var base64Img = dataUrl; // base64编码的图片
				    var imgFile = _this.dataURLtoFile(base64Img);//转换截取的base64为file对象
				    console.log('新截取的图片对象：====>', imgFile);
					var newHeadImage = _this.imagesAjax(imgFile);
					// alert("接口返回的头像uri：" + newHeadImage);
					var userInfo = {
						headImage : newHeadImage
					}
					_user.updateHeadImage({
						headImage : userInfo.headImage
					},function(res,msg){
						_smc.successTips(msg);
						window.location.href = './user-headimg-update.html';
					},function(errMsg){
						_smc.errorTips(errMsg);
					});
				}
			});
		})
	},

	validateForm : function(formData){
		// var result = {
		// 	status : false,
		// 	msg	   : ''
		// };
		
		// if(!_smc.validate(formData.headimg,'require')){
		// 	result.msg = '图片未选择！';
		// 	$('#headimg').addClass('errorSelected');
		// 	$('#headimg').focus();
		// 	return result;
		// }else{
		// 	$('#headimg').removeClass('errorSelected');
		// }
		// //通过验证，返回正确提示
		// result.status = true;
		// result.msg = '验证通过';
		// return result;
	}
};

$(function(){
	page.init();
});
