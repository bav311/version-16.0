var mySelection = app.selection;
var mySpacing = 4.2; // Расстояние в мм

if (mySelection.length > 1) {
    // Преобразуем коллекцию в обычный массив для сортировки
    var selArray = [];
    for (var i = 0; i < mySelection.length; i++) {
        selArray.push(mySelection[i]);
    }

    // Сортируем объекты слева направо по их левой границе (x1)
    selArray.sort(function(a, b) {
        return a.geometricBounds[1] - b.geometricBounds[1];
    });

    // Распределяем объекты с учетом сортировки
    for (var i = 1; i < selArray.length; i++) {
        var prevBounds = selArray[i-1].geometricBounds; // [y1, x1, y2, x2]
        var currBounds = selArray[i].geometricBounds;
        
        // Вычисляем новую левую границу (X1) для текущего объекта
        var newX1 = prevBounds[3] + mySpacing;
        
        // Сдвигаем объект на правильную позицию [X, Y]
        selArray[i].move([newX1, currBounds[0]]);
    }
} else {
    alert("Выделите хотя бы два объекта");
}