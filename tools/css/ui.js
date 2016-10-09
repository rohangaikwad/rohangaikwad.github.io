var isCtrlActive = false;


$(document).on('keydown', function (e) {
    if (e.which == 17) { isCtrlActive = true };
});

$(document).on('keyup', function (e) { isCtrlActive = false });

$(document).ready(function () {
    $("#toggleSideBar div").on("click", function () {
        $("#toggleSideBar, .play, .play .right").toggleClass("hidden");
    });

    $("#checkToggle div").on("click", function () {
        $("#checkToggle, #mainCont").toggleClass("hidden");
    });

    $("#slider1").change(function () {
        $('#mainImg').css('opacity', $("#slider1").val());
    });

    $("#zoomSlider").change(function () {
        zoom = parseInt($("#zoomSlider").val());
        changeZoom();
    });

    $("#toggleWindow div").on("click", function () {
        $("#toggleWindow").toggleClass("hidden");
        toggleFullScreen();
    });

    $("#closeImage").on("click", function () {
        $("#styl").html("");
        $("#mainImg,#mainImgCont").css("width", 0);
        $("#mainImg,#mainImgCont").css("height", 0);
        $("#tools").css("display", "none");
    });

    $(".futRightCopy").on("click", function () {
        $("#txtArea").val($(".futRight").html()).select();
        document.execCommand('copy');
    });
});

function changeZoom() {
    $('#mainImgCont').css('width', mainW * zoom);
    $('#mainImgCont').css('height', mainH * zoom);
    $('#mySvg').attr('width', mainW * zoom);
    $('#mySvg').attr('height', mainH * zoom);
    $("#zoomSlider").val(zoom);
}

$('html').bind('mousewheel DOMMouseScroll', function (e) {
    if (isCtrlActive) {
        var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
        var zoomIn = (delta < 0) ? false : true;

        e.preventDefault();
        e.stopPropagation();

        zoom += (zoomIn) ? 1 : -1;
        zoom = zoom.clamp(1, 10);
        changeZoom();
    }
});

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

var app = angular.module("spriteApp", []);
app.controller("layersCtrl", function ($scope) {
    $scope.layers = layers;
});