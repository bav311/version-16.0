#target "InDesign"

function main() {
    if (app.documents.length === 0) {
        alert("Нет открытых документов.");
        return;
    }

    var doc = app.activeDocument;
    var selection = app.selection;

    if (selection.length !== 1) {
        alert("Пожалуйста, выделите ровно один объект (например, группу).");
        return;
    }

    var targetItem = selection.pop();

    // Проверяем наличие видимых границ (с учетом обводок)
    if (!targetItem || !targetItem.hasOwnProperty("visibleBounds")) {
        alert("Выделенный объект не имеет видимых границ.");
        return;
    }

    var oldXUnits = doc.viewPreferences.horizontalMeasurementUnits;
    var oldYUnits = doc.viewPreferences.verticalMeasurementUnits;

    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

    // Считываем именно visibleBounds для идеального совпадения с панелью InDesign
    var rawBounds = targetItem.visibleBounds;

    doc.viewPreferences.horizontalMeasurementUnits = oldXUnits;
    doc.viewPreferences.verticalMeasurementUnits = oldYUnits;

    var boundsString = rawBounds.toString();
    var parts = boundsString.split(",");

    if (parts.length !== 4) {
        alert("Не удалось определить границы объекта.");
        return;
    }

    var topCoord = parseFloat(parts.shift());    
    var leftCoord = parseFloat(parts.shift());   
    var bottomCoord = parseFloat(parts.shift()); 
    var rightCoord = parseFloat(parts.shift());  

    // Точный расчет габаритов по видимым границам
    var heightMm = Math.abs(bottomCoord - topCoord);
    var widthMm = Math.abs(rightCoord - leftCoord);
    
    var heightCm = heightMm / 10;
    var widthCm = widthMm / 10;
    var areaCm2 = widthCm * heightCm;

    alert("Размеры сгруппированного объекта:\n" +
          "Ширина: " + widthMm.toFixed(3) + " мм\n" +
          "Высота: " + heightMm.toFixed(3) + " мм\n\n" +
          "Общая габаритная площадь:\n" + areaCm2.toFixed(3) + " см²");
}

main();
