
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/unslider/index.js');
require('util/backTotop/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _smc = require('util/smc.js');

$(function() {
	var bannerHtml	= _smc.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    var $slider 	= $('.banner').unslider({
    	speed: 800,               //  The speed to animate each slide (in milliseconds)
		delay: 2800,              //  The delay between slide animations (in milliseconds)
		complete: function() {

		},  //  A function that gets called after every slide animation
		keys: true,               //  Enable keyboard (left, right) arrow shortcuts
		dots: true,               //  Display dot navigation
		fluid: false              //  Support responsive design. May break non-responsive designs
    });
    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
    $(document).ready(function () {
        $.goup({
            trigger: 100,
            bottomOffset: 150,
            locationOffset: 100,
            title: '回到顶部',
            titleAsText: true
        });
    });
});

navSide.init({
	name : 'user-center'
});