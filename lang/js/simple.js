console.clear();

var phrases = null;
$(document).ready(function(){

    if (typeof(Storage) !== "undefined") {
        phrases = localStorage.getItem("phrases");
        if(phrases == null){
            phrases = new Array();
            localStorage.setItem("phrases", JSON.stringify(phrases));
        } else {
            phrases = JSON.parse(phrases);
        }
        render();
    }

    $(document).on("click","#addPhrase",function(){
        phrases.push({
            local: $('#local').val().trim(),
            eng: $('#eng').val().trim()
        });
        localStorage.setItem("phrases", JSON.stringify(phrases)); 
        render();
        $('#local').val("");
        $('#eng').val("").focus();
    });

    $(document).on("click","#download",function(){
        var x = localStorage.getItem("phrases");
        saveData(JSON.parse(x), "lang.json", true);
    });
});

function render(){
    var html = "<table>";
    phrases.forEach((phrase, index) => {
        html += '<tr><td>'+phrase.eng+'</td><td>'+phrase.local+'</td></trr>';
    });
    html += "</table>";
    $("#list").html(html);
}

function saveData(fileContents, fileName, isJSON) {
    var data = (isJSON) ? JSON.stringify(fileContents) : fileContents;
    var link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:,' + data;
    link.click();
    console.log("saving: " + fileName);
}
