var hex, oct, dec, bin;

$(document).ready(function () {
    hex = $("#hex"),dec = $("#dec"),oct = $("#oct"),bin = $("#bin");

    $('#bin').on('input',function(){  conv(  2,bin.val() ) });
    $('#oct').on('input',function(){  conv(  8,oct.val() ) });
    $('#dec').on('input',function(){  conv( 10,dec.val() ) });
    $('#hex').on('input',function(){  conv( 16,hex.val() ) });
});

function conv(base, num){
    num = num.replace(/[^a-f0-9]+/g, "");
    if(num.length == 0 || num == undefined || num == null) return;
    d = parseInt(num,base);

    bin.val(d.toString(2));
    oct.val(d.toString(8));
    dec.val( d );
    hex.val(d.toString(16));
}


$(document).on("click",".copy",function(e){
    v = $(this).prev("input").val();
    $("#ta").val(v);
    $("#ta").select();
    document.execCommand('copy');
});