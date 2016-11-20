var started = false, add = false, canAdd = true, canRemove = false, sX, sY, eX, eY, tX, tY, isRezActive = false, rezMode = false, dragMode = false;
var activElem;
var mainH = 0, mainW = 0, image = null;

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};


$("#slider1").change(function () {
    $('#blah').css('opacity', $("#slider1").val());
});

$('#imgInp').onclick = function () {
    this.value = null;
};

$("#imgInp").change(function () {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);

            image = new Image();
            image.src = e.target.result;
            image.onload = function(){
                console.log(image);
                mainW = this.width;
                mainH = this.height;

                $('#blah').show();

                $('#mySvg').attr("width", mainW);
                $('#mySvg').attr("height", mainH);
                $('#mySvg').show();

                $("#styl").html(".bgImg{background-image:url("+image.src+");}");
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}



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
            //addElem(x, y);
        }
    }

    if (e.which == 0 && started) {
        started = false, eX = x, eY = y, canAdd = true;
        updateElem();
    }

});

$("#mySvg").click(function (e) {
    console.log("mySVG");
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;

    if (add) addElem(x, y);
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
    if($("#mySvg rect").length() < 1){
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

function rezPos(){
    var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');
    var x = parseInt(arr[4]), y = parseInt(arr[5]) , w= parseInt( $(activElem).attr("width") ), h = parseInt( $(activElem).attr("height") );
    $("#rez").attr("cx",x+w);
    $("#rez").attr("cy",y+h);
}
function rezHandler(evt){
    if(!rezMode) rezMode = true;
    var elm = evt.target;
    elm.setAttributeNS(null, "onmouseup", "rezDez(evt)");
    rezX = parseInt( $("#rez").attr("cx") );
    rezY = parseInt( $("#rez").attr("cy") );
}

function rezDez(evt) {
    $("#rez").removeAttr("onmouseup");
    rezMode = false;
}


$(document).on("mousemove", function(evt){
    if(rezMode){
        var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');
        var off = $("#mySvg").offset();

        var dx = Math.max(evt.pageX - off.left, parseInt(arr[4])+1);
        var dy = Math.max(evt.pageY - off.top, parseInt(arr[5])+1);

        $("#rez").attr("cx",dx);
        $("#rez").attr("cy",dy);
        
        var w = dx - parseInt(arr[4]), h = dy - parseInt(arr[5]);

        $(activElem).attr("width", Math.max(1,w));
        $(activElem).attr("height", Math.max(1,h));
        
        $("#tmp").css("width", w);
        $("#tmp").css("height", h);
    }

    if(dragMode){
        var arr = activElem.getAttributeNS(null, "transform").slice(7, -1).split(' ');
        var off = $("#mySvg").offset();
        var w = parseInt($(activElem).attr("width"));
        var h = parseInt($(activElem).attr("height"));
        var dx = evt.pageX - off.left - Math.floor(w/2);
        var dy = evt.pageY - off.top - Math.floor(h/2);
        dx = dx.clamp(0, mainW  - w );
        dy = dy.clamp(0, mainH - h );
        //dx = Math.max(0, dx), dy = Math.max(0, dy);
        $(activElem).attr("transform", "matrix(1 0 0 1 " + dx + " " + dy + ")");
        rezPos();

        $("#tmp").css("background-position", "-"+dx+"px -"+dy+"px");
        $("#tmp").css("width", w);
        $("#tmp").css("height", h);
    }
});


$(document).on("mouseup", function(){
    rezMode = false, dragMode = false;
});


$(window).blur(function(){
    canRemove = false;
});

$(window).focus(function(){
});