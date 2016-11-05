var started = false, add = false, canAdd = true, canRemove = false, sX, sY, eX, eY, tX, tY, isRezActive = false, rezMode = false, dragMode = false;
var activElem;
var mainH = 0, mainW = 0, image = null, zoom = 1;
var layers = {}, curIndex = 0;

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};





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
    var svg = document.getElementsByTagName('svg')[0];
    var nRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    var name = "ico"+curIndex;
    curIndex++;

    $(nRect).addClass("sRct");
    $(nRect).attr("transform", "matrix(1 0 0 1 " + (x - 25) + " " + (y - 25) + ")");
    nRect.setAttribute("width", 50);
    nRect.setAttribute("height", 50);
    nRect.setAttribute("stroke", "black");
    nRect.setAttribute("stroke-width", 0.5);
    nRect.setAttribute("stroke-dasharray", "2,2");
    nRect.setAttribute("width", 50);
    nRect.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    nRect.setAttribute("data-id", name);
    nRect.setAttribute("data-name", name);
    $("#rez").before(nRect);
    $("#nameIconsButt").show();

    layers[name] = { "id":name,"name":name, "width":50, "height":50, "posX": x-25, "posY": y-25 };
    updateScopeLayers();
}


function updateScopeLayers() {
    var scope = angular.element($("#layersCont")).scope();
    scope.$apply(function(){
        scope.layers = layers;
    })
}


function rmvElem(elem) {
    var id = $(elem).attr("data-id");
    delete layers[id];    
    $(elem).remove();

    if ( $("#mySvg rect").length < 1 ) {
        $("#nameIconsButt").hide();
    }

    updateScopeLayers();
}

$(document).on("click",".deleteLayer",function(){
    var id = $(this).attr("data-id");
    var el = $("#mySvg rect[data-id="+id+"]");
    rmvElem(el);
});







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


$(document).on("mouseup", function () {
    rezMode = false, dragMode = false;
});


$(window).blur(function () {
    canRemove = false;
});

$(window).focus(function () {
});




$(document).ready(function () {
    $('#inpFile').on("click", function () {
        this.value = null;
    });

    $("#inpFile").change(function () {
        encodeFile(this);
    });
});


// read image and set bgImg background & width height of containers
function encodeFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            var data = e.target.result;
            $("#inputString").html(data);
        }
    }
}


$(document).on("click",".copy",function(e){
    $(this).prev("textarea").select();
    document.execCommand('copy');
    $(this).prev("textarea").blur();
});

$(document).on("click",".enc",function(e){
    var data = window.btoa($("#inputString").val());
    $("#inputString").val(data);
});

$(document).on("click",".dec",function(e){
    var data = $("#outputString").val();
    if(data.indexOf("base64,") !== -1){
        data = data.split("base64,")[1];
    }
    data = window.atob(data);
    if( $("#exptoFile").is(":checked") ) {
        saveData(data, "file.tmp", false);
    } else {
        console.log($('#exptoFile').is(':checked'));
    }
    $("#outputString").val(data);
});

function saveData(fileContents, fileName, isJSON) {
    var data = (isJSON) ? JSON.stringify(fileContents) : fileContents;
    var link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:,' + data;
    link.click();
    console.log("saving: " + fileName);
}