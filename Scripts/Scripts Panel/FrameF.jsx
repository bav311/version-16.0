app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Вставить фото вместо текста");

function main() {
    if (app.documents.length === 0) {
        alert("Нет открытых документов!");
        return;
    }

    // Проверяем, что выделен текстовый фрейм
    if (app.selection.length !== 1) {
        alert("Пожалуйста, выделите один текстовый фрейм (черной стрелкой)!");
        return;
    }

    var selectedObject = app.selection[0];
    var targetFrame = null;

    if (selectedObject instanceof TextFrame) {
        targetFrame = selectedObject;
    } else if (selectedObject.hasOwnProperty("parentTextFrames") && selectedObject.parentTextFrames.length > 0) {
        targetFrame = selectedObject.parentTextFrames[0];
    }

    if (!targetFrame) {
        alert("Выделенный объект не является текстовым фреймом!");
        return;
    }

    var doc = app.activeDocument;

    // Настройка поиска текста
    app.findTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.findWhat = "Фото большое";
    
    var foundResults = targetFrame.findText();
    var count = 0;

    // Обработка совпадений с конца строки
    for (var i = foundResults.length - 1; i >= 0; i--) {
        var textInstance = foundResults[i];
        var insertPoint = textInstance.insertionPoints[0];
        
        // Создаем фрейм внутри текста
        var newRectangle = insertPoint.rectangles.add();
        newRectangle.contentType = ContentType.GRAPHIC_TYPE;
        
        // Принудительно убираем рамку и обводку
        newRectangle.strokeWeight = 0;
        try {
            newRectangle.strokeColor = doc.swatches.itemByName("None");
        } catch(e) {
            newRectangle.strokeColor = "None";
        }
        
        // Задаем размеры: [высота, ширина] -> 26мм на 34мм
        newRectangle.geometricBounds =[0, 0, 34, 26]; 
        
        // Настройка обтекания текстом (Bounding Box)
        newRectangle.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
        
        // Отступы обтекания: 2 мм снизу и 2 мм справа [сверху, слева, снизу, справа]
        newRectangle.textWrapPreferences.textWrapOffset =[0, 0, 0, 2]; ; 

        // Удаляем слова "Фото большое"
        textInstance.remove();
        count++;
    }

    app.findTextPreferences = NothingEnum.nothing;

    if (count > 0) {
        // alert("Успешно заменено мест под фото: " + count);
    } else {
        alert("В выделенном фрейме текст 'Фото большое' не найден. Убедитесь, что регистр букв совпадает.");
    }
}