app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Применить PT Serif 8.5 (Русский)");

function main() {
    if (app.documents.length == 0) return;

    var targetFontFamily = "PT Serif"; 
    var targetSize = 9;              

    // Надежное получение объекта русского языка через системный локализатор
    var ruLanguage = app.languagesWithVendors.itemByName("$ID/Russian");
    if (!ruLanguage.isValid) {
        // Запасной вариант поиска, если системный ID почему-то недоступен
        ruLanguage = app.languagesWithVendors.itemByName("Russian");
    }

    var textObjects = [];

    // Собираем текст на основе выделения
    if (app.selection.length > 0) {
        for (var i = 0; i < app.selection.length; i++) {
            var item = app.selection[i];
            
            if (item.hasOwnProperty("textStyleRanges")) {
                textObjects.push(item);
            } 
            else if (item.hasOwnProperty("textContainers") || item.hasOwnProperty("texts")) {
                if (item.texts && item.texts.length > 0) {
                    textObjects.push(item.texts);
                }
            }
            else if (item.hasOwnProperty("cells") || item.constructor.name == "Cell" || item.constructor.name == "Table") {
                if (item.texts && item.texts.length > 0) {
                    textObjects.push(item.texts);
                }
            }
        }
    } else {
        var doc = app.activeDocument;
        for (var k = 0; k < doc.stories.length; k++) {
            if (doc.stories[k].texts.length > 0) {
                textObjects.push(doc.stories[k].texts);
            }
        }
    }

    if (textObjects.length == 0) {
        alert("Пожалуйста, выделите текст или текстовый фрейм перед запуском.");
        return;
    }

    // Обрабатываем собранные текстовые объекты
    for (var t = 0; t < textObjects.length; t++) {
        var txt = textObjects[t];
        
        // 1. Меняем кегель
        try {
            txt.pointSize = targetSize;
        } catch(e) {}

        // 2. Принудительно выставляем язык на уровне всего родительского контейнера
        if (ruLanguage.isValid) {
            try {
                txt.appliedLanguage = ruLanguage;
            } catch(e) {}
        }

        // 3. Меняем шрифт по диапазонам стилей (сохраняя локальный курсив/болд)
        try {
            var ranges = txt.textStyleRanges;
            for (var r = 0; r < ranges.length; r++) {
                var range = ranges[r];
                var currentStyle = range.fontStyle; 
                
                // Прописываем русский язык и каждому отдельному диапазону символов для страховки
                if (ruLanguage.isValid) {
                    try {
                        range.appliedLanguage = ruLanguage;
                    } catch(e) {}
                }

                try {
                    range.appliedFont = app.fonts.itemByName(targetFontFamily + "\t" + currentStyle);
                } catch(e) {
                    try {
                        range.appliedFont = targetFontFamily;
                    } catch(err) {}
                }
            }
        } catch(e) {}
    }
}
