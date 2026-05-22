var mySelection = app.selection;
var mySpacing = 4.2; // Расстояние в единицах измерения документа (например, мм)

if (mySelection.length > 1) {
    for (var i = 1; i < mySelection.length; i++) {
        var prevBounds = mySelection[i-1].geometricBounds; // [y1, x1, y2, x2]
        var currBounds = mySelection[i].geometricBounds;
        var width = currBounds[3] - currBounds[1];
        var newX1 = prevBounds[3] + mySpacing;
        
        mySelection[i].move([newX1, currBounds[0]]);
    }
} else {
    alert("Выделите хотя бы два объекта");
}
