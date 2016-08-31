//Event.js
$('.child').on('click', function(e) {
    console.log("child click");
});

$('.child').on('click', function(e) {
    console.log("child click 2");
});

$(".parent").on('click','.child',function(e){
    console.log("child delegate click");
});
//
$(".parent").on('click',{'data1':1},function(e){
    console.log(e);
});