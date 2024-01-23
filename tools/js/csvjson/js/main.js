var src = "";
var out = "";
var ext = "";

document.querySelector("#file").addEventListener("change", () => {
    let file = document.getElementById("file").files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        src = e.target.result;
        console.log(src);
    };
    reader.readAsText(file);
})

document.querySelector("#json").addEventListener("click", () => {
    const res = Papa.parse(src, { header: true });
    console.log(res);
    out = JSON.stringify(res);
    document.querySelector("#result").value = JSON.stringify(res, null, 4);
    ext = "json";
})
document.querySelector("#csv").addEventListener("click", () => {
    const res = Papa.unparse(JSON.parse(src));
    console.log(res);
    document.querySelector("#result").value = res;
    ext = "csv";
})
document.querySelector("#down").addEventListener("click", () => {
    var link = document.createElement('a');
    link.download = `data.${ext}`;
    link.href = 'data:,' + out;
    link.click();
    console.log("saving file");
})
