// Скрипт переключает опцию "Автоматическая установка размера" у выделенного текстового фрейма.

// Проверяем, что у пользователя что-то выделено.
if (app.selection.length > 0) {
    // Получаем первый выделенный объект.
    var selectedObject = app.selection[0];

    // Убеждаемся, что это именно текстовый фрейм.
    if (selectedObject instanceof TextFrame) {
        // Получаем настройки текстового фрейма.
        var prefs = selectedObject.textFramePreferences;

        // Проверяем текущее состояние "Автоматической установки размера".
        if (prefs.autoSizingType !== AutoSizingTypeEnum.OFF) {
            // Если включена, выключаем.
            prefs.autoSizingType = AutoSizingTypeEnum.OFF;
            alert("Автоматическая установка размера выключена.");
        } else {
            // Если выключена, включаем.
            // Устанавливаем размер по высоте и привязку к верхней средней точке.
            prefs.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
            prefs.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_CENTER_POINT;
            alert("Автоматическая установка размера включена (только по высоте).");
        }
    } else {
        // Сообщение об ошибке, если выделен не текстовый фрейм.
        alert("Пожалуйста, выделите текстовый фрейм.");
    }
} else {
    // Сообщение об ошибке, если ничего не выделено.
    alert("Пожалуйста, выделите текстовый фрейм.");
}