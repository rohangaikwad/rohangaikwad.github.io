var started = false, add = false, canAdd = true, canRemove = false, sX, sY, eX, eY, tX, tY, isRezActive = false, rezMode = false, dragMode = false;
var activElem;
var mainH = 0, mainW = 0, image = null, zoom = 1;

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

$(document).ready(function () {
    $('#imgInp').on("click", function () {
        console.log("clicked");
        this.value = null;
    });

    $("#imgInp").change(function () {
        console.log("changed");
        readURL(this);
    });

    $("#mySvg").on("click", function (e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        if (add) addElem(x/zoom, y/zoom);
    });
});






$(document).on('keydown', function (e) {
    if (e.which == 16 && !add) { add = true; }
    if (e.which == 18 && !canRemove) { canRemove = true; }
    //console.log(e.which);
});

$(document).on('keyup', function (e) { add = false; canRemove = false; });

$("#mySvg").on("mousemove", function (e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;

    if (e.which == 1 && add) {
        if (!started) {
            started = true, sX = x, sY = y;
        }
        tX = x, tY = y;
        updateElem();

        if (canAdd) {
            canAdd = false;
        }
    }

    if (e.which == 0 && started) {
        started = false, eX = x, eY = y, canAdd = true;
        updateElem();
    }

});



function addElem(x, y) {
    console.log("added");
    var svg = document.getElementsByTagName('svg')[0];
    var nRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    $(nRect).addClass("sRct");
    $(nRect).attr("transform", "matrix(1 0 0 1 " + (x - 25) + " " + (y - 25) + ")");
    nRect.setAttribute("width", 50);
    nRect.setAttribute("height", 50);
    nRect.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    $("#rez").before(nRect);
    $("#nameIconsButt").show();
}


function rmvElem(elem) {
    $(elem).remove();
    if ($("#mySvg rect").length() < 1) {
        $("#nameIconsButt").hide();
    }
}









var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function selectElement(evt) {
    if (canRemove) {
        rmvElem(evt.target);
    } else {
        selectedElement = evt.target;
        activElem = evt.target;
        dragMode = true;
        $(selectedElement).addClass("seRect");
        currentX = evt.clientX;
        currentY = evt.clientY;
        currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');

        for (var i = 0; i < currentMatrix.length; i++) {
            currentMatrix[i] = parseFloat(currentMatrix[i]);
        }

        //selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
        selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
        rezPos();
    }
}


function deselectElement(evt) {
    if (selectedElement != 0) {
        $(selectedElement).removeClass("seRect");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
        dragMode = false;
    }
}




var rezX = 0, rezY = 0;

function rezPos() {
    var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');
    var x = parseInt(arr[4]), y = parseInt(arr[5]), w = parseInt($(activElem).attr("width")), h = parseInt($(activElem).attr("height"));
    $("#rez").attr("cx", x + w);
    $("#rez").attr("cy", y + h);
}
function rezHandler(evt) {
    if (!rezMode) rezMode = true;
    var elm = evt.target;
    elm.setAttributeNS(null, "onmouseup", "rezDez(evt)");
    rezX = parseInt($("#rez").attr("cx"));
    rezY = parseInt($("#rez").attr("cy"));
}

function rezDez(evt) {
    $("#rez").removeAttr("onmouseup");
    rezMode = false;
}


$(document).on("mousemove", function (evt) {
    var off = $("#mainImgCont").offset();
    $("#footer").html("x:" + evt.pageX  + " y:"+ evt.pageY + " | SVG Offset: ["+off.left+","+off.top+"]");

    if (rezMode) {
        var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');

        var dx = Math.max(evt.pageX - off.left, parseInt(arr[4]) + 1);
        var dy = Math.max(evt.pageY - off.top, parseInt(arr[5]) + 1);

        $("#rez").attr("cx", dx/zoom);
        $("#rez").attr("cy", dy/zoom);

        var w = dx/zoom - parseInt(arr[4]), h = dy/zoom - parseInt(arr[5]);

        $(activElem).attr("width", Math.max(1, Math.floor(w)));
        $(activElem).attr("height", Math.max(1, Math.floor(h)));

        $("#tmp").css("width", w);
        $("#tmp").css("height", h);
    }

    if (dragMode) {
        var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');
        var w = parseInt($(activElem).attr("width"));
        var h = parseInt($(activElem).attr("height"));
        var dx = evt.pageX - off.left - Math.floor(w / 2);
        var dy = evt.pageY - off.top - Math.floor(h / 2);
        dx = dx.clamp(0, (mainW - w)*zoom);
        dy = dy.clamp(0, (mainH - h)*zoom);
        dx = dx/zoom;
        dy = dy/zoom;
        //dx = Math.max(0, dx), dy = Math.max(0, dy);
        $(activElem).attr("transform", "matrix(1 0 0 1 " + Math.floor(dx) + " " + Math.floor(dy) + ")");
        rezPos();

        $("#tmp").css("background-position", "-" + Math.floor(dx) + "px -" + Math.floor(dy) + "px");
        $("#tmp").css("width", w);
        $("#tmp").css("height", h);
    }

    var dx = evt.pageX - off.left;
    var dy = evt.pageY - off.top;

    $("#guide").attr("cx", dx/zoom);
    $("#guide").attr("cy", dy/zoom);
});


$(document).on("mouseup", function () {
    rezMode = false, dragMode = false;
});


$(window).blur(function () {
    canRemove = false;
});

$(window).focus(function () {
});



// read image and set bgImg background & width height of containers
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                mainW = this.width;
                mainH = this.height;

                $('#mySvg').attr("width", mainW);
                $('#mySvg').attr("height", mainH);
                $('#mySvg').attr("viewBox", "0 0 " +mainW+ " " +mainH);
                $('#mySvg').show();

                $("#mainImgCont").css("width", mainW);
                $("#mainImgCont").css("height", mainH);

                $("#styl").html(".bgImg{background-image:url(" + image.src + ");}");

                $("#tools").css("display","inline-block");

                var ah = (mainW > 200) ? (mainH * (200/mainW)) : mainH;
                console.log(ah);
                $(".smallImg").css("height", ah);
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}