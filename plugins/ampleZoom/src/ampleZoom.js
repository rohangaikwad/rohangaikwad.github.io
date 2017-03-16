Number.prototype.ampleClamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

;(function ($, window, document, undefined) {

    $.fn.ampleZoom = function (options) {
        return this.each(function(){
            var _ = $(this), prefix = "ampleZoom-";
            var w = _.width(), h = _.height();
            _.on("load",function(){
                checkSauce();
                console.log("loaded");
            });

            _.hide();
            var settings = $.extend({
                // These are the defaults.
                tint: false,
                zoomImgSrc: "",
                thumbImg: _.attr("src"),
                zoomLevel: 2,
                minWidth: 0,
                maxWidth: 999999
            }, options);

            
            var isAmpleHover = false,
            ampleImage = [], ampleOffset = [],
            zoomLevel = settings.zoomLevel, quart = 50 / zoomLevel;

            
            function init(){  
                zoomLevel = Math.max(1,zoomLevel);
                quart = 50/zoomLevel;
                $(zImg).css({width:100*zoomLevel+"%",height:100*zoomLevel+"%"});
                $(marker).css({"width":w/zoomLevel,"height":h/zoomLevel});
            }

            function checkSauce(){
                var newSauce = _.attr("src");
                if(settings.thumbImg != newSauce){
                    settings.thumbImg = newSauce;
                    setImg(newSauce);
                };
            }


            function createElem(elem){return document.createElement(elem);}


            _.hover(function(e){
                console.log(0);
            });

            var attr = _.attr('data-zoom');
            // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
            if (typeof attr !== typeof undefined && attr !== false && settings.zoomImgSrc == "") {
            } else {
                settings.zoomImgSrc = _.attr("src");
            }

            console.log(settings);

            var docFrame = document.createDocumentFragment();

            var ampleZoomContainer = createElem("div");
            $(ampleZoomContainer).addClass(prefix+"container").css({ width: w, height: h });

            var copy = createElem("div");
            $(copy).addClass(prefix+"copy");

            var copiedImg = createElem("img");


            var marker = createElem("div");
            $(marker).addClass(prefix+"marker");

            if(settings.tint != false){
                var tintImage = createElem("img");
                $(tintImage).css({width:w,height:h});

                marker.appendChild(tintImage);
                $(copy).css("background-color", settings.tint);
            }

            copy.appendChild(copiedImg);
            copy.appendChild(marker);
            ampleZoomContainer.appendChild(copy);

            var zoomCont = createElem("div");
            $(zoomCont).addClass(prefix+"magnified");

            var zoomImg = createElem("div");
            $(zoomImg).addClass("rel")

            var zImg = createElem("img");
            $(zImg).css({width: 100*zoomLevel+"%", height: 100*zoomLevel+"%"});

            function setImg(sauce){
                copiedImg.src = zImg.src = sauce;
                if(settings.tint != false) tintImage.src = sauce;
            }
            setImg(settings.zoomImgSrc);
            init();

            zoomImg.appendChild(zImg);
            zoomCont.appendChild(zoomImg);
            ampleZoomContainer.appendChild(zoomCont);

            docFrame.appendChild(ampleZoomContainer);

            _.after(docFrame);



            $(copy).hover(function(e){
                var ww = $(window).width();
                if ( ww >= settings.minWidth && ww <= settings.maxWidth) {
                    isAmpleHover = true;
                    ampleOffset = $(copy).offset();
                    //console.log(ampleOffset);

                    checkSauce();

                    $(zoomCont).css("display","inline-block");
                    $(marker).css("display","inline-block");
                    if(settings.tint != false){
                        $(ampleZoomContainer).addClass("tinted");
                    }
                }

            }, function (e) {
                if(settings.tint != false){
                    $(ampleZoomContainer).removeClass("tinted");
                }
                $(marker).hide();
                isAmpleHover = false;
                $(zoomCont).hide();
            });

            $(copy).bind('mousewheel DOMMouseScroll', function (e) {
                if (isAmpleHover) {
                    var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
                    var scrollUp = (delta < 0) ? false : true;
                    e.preventDefault();
                    zoomLevel += scrollUp ? -0.1 : 0.1;
                    init();
                    ampleZoomXX(e);
                }
            });

            $(document).on("mousemove", function (e) {
                if (isAmpleHover) {
                    ampleZoomXX(e);
                }
            });
            function ampleZoomXX(e) {
                //console.log(1);
                var oY = ampleOffset.top, oX = ampleOffset.left,
                    mX = e.pageX, mY = e.pageY;

                var posL = ((mX - oX) / w) * 100;
                posL = posL.ampleClamp(quart, 100 - quart) - quart;
                posL *= zoomLevel;

                var posT = ((mY - oY) / h) * 100;
                posT = posT.ampleClamp(quart, 100 - quart) - quart;
                posT *= zoomLevel;


                var hiX = mX - oX - (w / (zoomLevel * 2));
                var hiY = mY - oY - (h / (zoomLevel * 2));
                hiX = hiX.ampleClamp(0, w - (w / zoomLevel));
                hiY = hiY.ampleClamp(0, h - (h / zoomLevel));

                $(marker).css({ "left": hiX, "top": hiY });
                if( settings.tint != false ) $(tintImage).css({ "left": -hiX, "top": -hiY });

                $(zImg).css({ "left": (posL * -1) + "%", "top": (posT * -1) + "%" });
            }
        });        
    }

})(jQuery, window, document);


$(document).ready(function(){
    $(".ampleZoom").ampleZoom({
        tint: "#000",zoomLevel: 3, minWidth: 200, maxWidth: 1200
    });
});


setTimeout(function(){
    $("#aaa").attr("src","http://wallpaper-gallery.net/images/image/image-17.png");
},1000);