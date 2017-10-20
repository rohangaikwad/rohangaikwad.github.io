$(document).ready(function () {
    $('#inpFile').on("click", function () {
        this.value = null;
    });

    $("#inpFile").change(function () {
        decodeFile(this);
    });
});


// read image and set bgImg background & width height of containers
function decodeFile(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            image = new Image();
            image.src = e.target.result;
            image.onload = function () {


                var c=document.getElementById("canv");
                c.width = this.width;
                c.height = this.height;
                var ctx=c.getContext("2d");
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(image, 0, 0);
                var imgData=ctx.getImageData(0,0,this.width,this.height);
                var str = "";
                for(var d of imgData.data){
                    str += String.fromCharCode(d);
                }
                //console.log(imgData.data);
                $("#outputString").val(str);
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}


$(document).on("keyup","#inputString",function(e){
    console.clear();
    var _ = $(this);
    var txt = _.val();
    var len = txt.length;

    // calc a perfect square number
    var sz = Math.ceil(Math.sqrt(len/4));

    var texArrSz = sz * sz * 4;
    var arr = new Array(texArrSz).fill(0);
    //console.log(arr);

    for(var i = 0; i < len; i++){
        var c = txt.charCodeAt(i);
        arr[i] = c;
    }
    //console.log(arr);

    var c=document.getElementById("canv");
    c.width = sz;
    c.height = sz;
    var ctx=c.getContext("2d");
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    var imgData=ctx.createImageData(sz,sz);
    imgData.data.set(arr);
    ctx.putImageData(imgData,0,0);
    console.log(imgData.data);

    //var imgData=ctx.getImageData(0,0,sz,sz);
    //console.log(imgData.data);
});

$(document).on("click",".copy",function(e){
    $(this).prev("textarea").select();
    document.execCommand('copy');
    $(this).prev("textarea").blur();
});

$(document).on("click",".save",function(e){
    var c=document.getElementById("canv");
    saveData(c.toDataURL(), "image.png", false);
});


function saveData(fileContents, fileName, isJSON) {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = fileContents;
    link.click();
    console.log("saving: " + fileName);
}