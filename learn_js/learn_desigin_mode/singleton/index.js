//最简单的单例
var mySingleton = {
    property1: "something",
    property2: "something else",
    method1: function () {
        console.log('hello world');
    }
};

//闭包实现
var single = (function(){
    var unique;

    function Construct(){
        // ... 生成单例的构造函数的代码
    }

    if(unique){
        unique = new Constuct();
    }
    
    return unique;
})();