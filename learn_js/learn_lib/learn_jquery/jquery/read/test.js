$.ajax(
    {
        url:"",
        dataType:"jsonp",
        success:function(){
            console.log("success");
        },
        error:function(){
            console.log("error");
        }
    }
);

$('div').on('click', function(e) {
    alert("Bound handler called.");
    return false;
});