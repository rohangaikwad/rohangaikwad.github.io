$(document).ready(function(){
    $("#toggleSideBar div").on("click",function(){
        $("#toggleSideBar, .play, .play .right").toggleClass("hidden");
    });

    $("#checkToggle div").on("click",function(){
        $("#checkToggle, #mainCont").toggleClass("hidden");
    });

    $("#slider1").change(function () {
        $('#mainImg').css('opacity', $("#slider1").val());
    });

    $("#zoomSlider").change(function () {
        zoom = $("#zoomSlider").val();
        $('#mainImgCont').css('width', mainW * zoom);
        $('#mainImgCont').css('height', mainH * zoom);
        $('#mySvg').attr('width', mainW * zoom);
        $('#mySvg').attr('height', mainH * zoom);
    });

    $("#toggleWindow div").on("click",function(){
        $("#toggleWindow").toggleClass("hidden");
        toggleFullScreen();
    });

    $("#closeImage").on("click",function(){
        $("#styl").html("");
        $("#mainImg,#mainImgCont").css("width", 0);
        $("#mainImg,#mainImgCont").css("height", 0);
        $("#tools").css("display","none");
    });
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