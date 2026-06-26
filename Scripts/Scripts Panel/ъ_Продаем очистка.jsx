app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Оставить текст в выделении");

function main() {
    // 1. Проверяем, выделено ли что-нибудь
    if (app.selection.length === 0) {
        alert("Пожалуйста, выделите текстовый фрейм!");
        return;
    }

    var selection = app.selection[0];
    
    // 2. Проверяем, является ли выделенный объект текстовым фреймом
    if (selection.constructor.name !== "TextFrame") {
        alert("Выделенный объект не является текстовым фреймом!");
        return;
    }

    // Сбрасываем настройки поиска GREP
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    
    // Моя рабочая формула
    app.findGrepPreferences.findWhat = "(?s)Продаем.+?Разное.+?(?=^ *\\r)";
    
    // Ищем ТОЛЬКО внутри выделенного фрейма (его текстового потока Story)
    var found = selection.parentStory.findGrep();
    
    if (found.length > 0) {
        var match = found[0];
        var textToKeep = match.contents;
        
        // Очищаем только этот текстовый поток и вставляем сохраненный текст
        selection.parentStory.contents = textToKeep;
        // alert("Готово! Текст во фрейме очищен.");
        
        // --- БЕЗОПАСНЫЙ ВЫЗОВ ВТОРОГО СКРИПТА ---
        var currentFolder = null;

        try {
            // Способ 1: Пытаемся получить путь из активного скрипта InDesign
            currentFolder = new File(app.activeScript).parent;
        } catch (e) {
            try {
                // Способ 2: Если запущено из ExtendScript Toolkit / VS Code
                currentFolder = new File($.fileName).parent;
            } catch (err) {
                // Если файл вообще ни разу не сохранялся на диск
                currentFolder = null;
            }
        }

        if (currentFolder !== null) {
            var nextScriptFile = new File(currentFolder + "/ъ_Объявления.jsx");
            
            if (nextScriptFile.exists) {
                app.doScript(nextScriptFile, ScriptLanguage.JAVASCRIPT);
            } else {
                alert("Ошибка: Скрипт 'ъ_Объявления.jsx' не найден в папке " + currentFolder.fsName);
            }
        } else {
            alert("Критическая ошибка: Скрипт должен быть сохранен на диск перед запуском!");
        }
        // ---------------------------------------------
        
    } else {
        alert("Внутри этого фрейма текст по GREP-запросу не найден!");
    }
    
    // Очищаем настройки поиска за собой
    app.findGrepPreferences = NothingEnum.nothing;
}



/* app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Оставить текст в выделении");

function main() {
    // 1. Проверяем, выделено ли что-нибудь
    if (app.selection.length === 0) {
        alert("Пожалуйста, выделите текстовый фрейм!");
        return;
    }

    var selection = app.selection[0];
    
    // 2. Проверяем, является ли выделенный объект текстовым фреймом
    if (selection.constructor.name !== "TextFrame") {
        alert("Выделенный объект не является текстовым фреймом!");
        return;
    }

    // Сбрасываем настройки поиска GREP
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    
    // Моя рабочая формула
    app.findGrepPreferences.findWhat = "(?s)Продаем.+?Разное.+?(?=^ *\\r)";
    
    // Ищем ТОЛЬКО внутри выделенного фрейма (его текстового потока Story)
    var found = selection.parentStory.findGrep();
    
    if (found.length > 0) {
        var match = found[0];
        var textToKeep = match.contents;
        
        // Очищаем только этот текстовый поток и вставляем сохраненный текст
        selection.parentStory.contents = textToKeep;
        alert("Готово! Текст во фрейме очищен.");
    } else {
        alert("Внутри этого фрейма текст по GREP-запросу не найден!");
    }
    
    // Очищаем настройки поиска за собой
    app.findGrepPreferences = NothingEnum.nothing;
}
 */