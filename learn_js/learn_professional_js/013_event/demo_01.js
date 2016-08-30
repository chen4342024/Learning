var btn = document.getElementById("myBtn");

btn.onclick = function(event){
    console.log("btn on click");
    console.log("event.currentTarget == this --->%s",event.currentTarget === this);
    console.log("event.target == this --->%s",event.target === this);
};

document.body.onclick = function(event){
    console.log("document body on click");
    console.log("event.currentTarget === document.body --->%s",event.currentTarget === document.body);
    console.log("this === document.body --->%s",this === document.body);
    console.log("event.target == this --->%s",event.target === this);
    console.log("event.target == btn --->%s",event.target === btn);
};