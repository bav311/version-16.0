if (app.documents.length > 0 && app.selection.length > 1) {
    var doc = app.activeDocument;
    
    // Сохраняем и устанавливаем единицы в мм
    var oldYUnits = doc.viewPreferences.verticalMeasurementUnits;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

    var mySelection = app.selection;
    var mySpacing = 4.2; // Расстояние в мм

    var sortedSelection = [];
    for (var i = 0; i < mySelection.length; i++) sortedSelection.push(mySelection[i]);

    // Сортируем сверху вниз
    sortedSelection.sort(function(a, b) {
        return a.geometricBounds[0] - b.geometricBounds[0];
    });

    app.doScript(function() {
        for (var i = 1; i < sortedSelection.length; i++) {
            var prevBottom = sortedSelection[i-1].geometricBounds[2];
            var currTop = sortedSelection[i].geometricBounds[0];
            
            // Вычисляем, на сколько именно нужно подвинуть объект (delta)
            // Новая позиция минус текущая
            var diff = (prevBottom + mySpacing) - currTop;
            
            // Метод move перемещает объект относительно текущей позиции [x, y]
            // По X не двигаем (0), по Y двигаем на разницу (diff)
            sortedSelection[i].move(undefined, [0, diff]);
        }
    }, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Распределить без сдвига фото");

    doc.viewPreferences.verticalMeasurementUnits = oldYUnits;
} else {
    alert("Выделите несколько объектов.");
}
