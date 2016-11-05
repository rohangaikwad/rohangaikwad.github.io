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