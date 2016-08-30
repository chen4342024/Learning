function containsTest() {
    alert("contains --> " + document.documentElement.contains(document.body));
}

var PositionRelate = {
    1: "none",
    2: "before",
    4: "after",
    8: "contains",
    16: "be contained",
};

function compare() {
    var relate = document.documentElement.compareDocumentPosition(document.body);
    alert(PositionRelate[relate]);
}