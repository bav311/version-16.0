// Запуск функции main как единой операции с возможностью отмены одной кнопкой (Ctrl+Z)
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Цепочка GREP в выделении");

function main() {
    // 1. Проверяем, открыт ли документ
    if (app.documents.length === 0) {
        alert("Ошибка: Нет открытых документов!");
        return;
    }

    var doc = app.activeDocument;

    // 2. Проверяем, выделено ли что-нибудь
    if (app.selection.length === 0) {
        alert("Ошибка: Ничего не выделено!\nПожалуйста, выделите текстовый фрейм.");
        return;
    }

    // Сохраняем выделенные объекты в переменную
    var currentSelection = app.selection;
	
    // ==========================================
    // НОВЫЙ БЛОК: ПРИМЕНЕНИЕ СТИЛЯ ОБЪЕКТА
    // ==========================================
    var objStyle = doc.objectStyles.itemByName("Помяните");
    if (!objStyle.isValid) {
        alert("Ошибка: Стиль объекта 'Помяните' не найден в документе!");
        return; // Прерываем выполнение, если стиля нет
    }

    // Применяем стиль ко всем выделенным графическим/текстовым фреймам
    for (var o = 0; o < currentSelection.length; o++) {
        var item = currentSelection[o];
        // Проверяем, что объект поддерживает применение стилей объекта (фреймы, линии)
        if (item.hasOwnProperty("appliedObjectStyle")) {
            item.appliedObjectStyle = objStyle;
        }
    }
    // ==========================================	

    // 3. Сброс глобальных настроек поиска
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;

    // 4. Массив с цепочкой ваших запросов
    var grepChain = [

        {
            name: "2. Заголовок",
            find: "(УХОДИТ ЖИЗНЬ.+)\\r(?=\\r)", 
            change: "$1", 

        }, 
	
       
	   {
            name: "0. Удаление абзаца после фото фрейма",
            find: "(Фото большое)\\r", 
            change: "$1"
        },	
		
        {
            name: "1. Удаление двойных пробелов",
            find: " {2,}", 
            change: " "
        },
		
/* 		{
            name: "2. Пустой абзац в конце",
            find: "\\s+$", 
            change: "", 
        },	 */

        {
            name: "2. Заголовок",
            find: "УХОДИТ ЖИЗНЬ.+", 
            change: "$0", 
            charStyle: "Жирный",
			alignCenter: true // добавляем флаг выравнивания по центру 
        }, 
       
	   {
            name: "4. ФИО",
            find: "^\\u\\w+(-\\w+)? \\u\\w+ \\u\\w+", 
            change: "$0", 
            charStyle: "Жирный",
			alignCenter: true // добавляем флаг выравнивания по центру 
        },

	   {
            name: "5. Село",
            find: "^\\(.+", 
            change: "$0", 
            charStyle: "Жирный",
			alignCenter: true // добавляем флаг выравнивания по центру 
        },
		
        {
            name: "6. Подпись",
            find: "^(Родные|Дочери|Внуки|Правнуки|Друзья).+",
            change: "$0\\r", 
            charStyle: "Жирный",
            alignRight: true // Добавляем флаг выравнивания по правому краю
        },
		
	   {
            name: "7. Разбить ФИО",
            find: "^(\\u\\w+(-\\w+)?) (\\u\\w+) (\\u\\w+)", 
            change: "$1\\r$3 $4", 
            
        },

 	   {
			name: "7. Место для линии",
			find: "^\\r\\r", 
			change: "\\r",
			alignCenter: true // добавляем флаг выравнивания по центру 
        },
 
		{
            name: "2. Пустой абзац в конце",
            find: "\\s\\z", 
            change: "", 
        },	 	

    ];

    var totalChanges = 0;

    // 5. Перебираем каждый объект в выделении
    for (var s = 0; s < currentSelection.length; s++) {
        var selectedItem = currentSelection[s];

        // Проверяем, поддерживает ли выделенный объект поиск/замену текста
        if (!selectedItem.hasOwnProperty("changeGrep")) {
            continue; // Если это картинка или линия — пропускаем её
        }

        // БЛОК: СБРОС АБЗАЦНОГО ОТСТУПА
        if (selectedItem.hasOwnProperty("paragraphs")) {
            selectedItem.paragraphs.everyItem().firstLineIndent = 0;
        }

        // 6. Основной цикл цепочки GREP для текущего фрейма
        for (var i = 0; i < grepChain.length; i++) {
            var currentGrep = grepChain[i];

            app.findGrepPreferences.findWhat = currentGrep.find;
            app.changeGrepPreferences.changeTo = currentGrep.change;

            // Проверка и применение символьного стиля
            if (currentGrep.charStyle) {
                var cStyle = doc.characterStyles.itemByName(currentGrep.charStyle);
                if (cStyle.isValid) {
                    app.changeGrepPreferences.appliedCharacterStyle = cStyle;
                } else {
                    alert("Пропущено: Стиль '" + currentGrep.charStyle + "' не найден.");
                    continue;
                }
            }

            // Проверка и применение абзацного стиля
            if (currentGrep.paraStyle) {
                var pStyle = doc.paragraphStyles.itemByName(currentGrep.paraStyle);
                if (pStyle.isValid) {
                    app.changeGrepPreferences.appliedParagraphStyle = pStyle;
                } else {
                    alert("Пропущено: Стиль '" + currentGrep.paraStyle + "' не найден.");
                    continue;
                }
            }

            // ==========================================
            // ВЫРАВНИВАНИЕ ПО ПРАВОМУ КРАЮ
            // ==========================================
            if (currentGrep.alignRight) {
                // Заставляем заменяемый текст выровняться вправо
                app.changeGrepPreferences.justification = Justification.RIGHT_ALIGN;
            }
            // ==========================================
			
            // ==========================================
            // ВЫРАВНИВАНИЕ ПО СЕРЕДИНЕ
            // ==========================================
            if (currentGrep.alignCenter) {
                // Заставляем заменяемый текст выровняться по середине
                app.changeGrepPreferences.justification = Justification.CENTER_ALIGN;
            }
            // ==========================================			

            // Вызываем changeGrep() у фрейма
            var results = selectedItem.changeGrep();
            totalChanges += results.length;

            // Очистка настроек перед следующим шагом цикла
            app.findGrepPreferences = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
        }
    }
	
    // 7. Финальный сброс панелей поиска
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;

/* alert("Успешно выполнено!\nАбзацные отступы сброшены.\nОбработано выделенных объектов: " + currentSelection.length + "\nВсего замен внутри них: " + totalChanges); */

	// БЛОК ЗАПУСКА СЛЕДУЮЩЕГО СКРИПТА
	try {
		var scriptFile;
		
		// Проверяем, запущен ли скрипт из панели InDesign или из редактора
		try {
			scriptFile = new File(app.activeScript);
		} catch(e) {
			// Если app.activeScript недоступен, берем путь из среды отладки
			scriptFile = new File($.fileName); 
		}

		var scriptFolder = scriptFile.parent; 
		var nextScript = new File(scriptFolder + "/FrameF.jsx"); 

		if (nextScript.exists) {
			app.doScript(nextScript, ScriptLanguage.JAVASCRIPT);
		} else {
			alert("Ошибка: Скрипт не найден по пути:\n" + nextScript.fsName);
		}
	} catch (error) {
		alert("Критическая ошибка: " + error.message);
	}

	// БЛОК ЗАПУСКА СЛЕДУЮЩЕГО СКРИПТА
	try {
		var scriptFile;
		
		// Проверяем, запущен ли скрипт из панели InDesign или из редактора
		try {
			scriptFile = new File(app.activeScript);
		} catch(e) {
			// Если app.activeScript недоступен, берем путь из среды отладки
			scriptFile = new File($.fileName); 
		}

		var scriptFolder = scriptFile.parent; 
		var nextScript = new File(scriptFolder + "/FrameL.jsx"); 

		if (nextScript.exists) {
			app.doScript(nextScript, ScriptLanguage.JAVASCRIPT);
		} else {
			alert("Ошибка: Скрипт не найден по пути:\n" + nextScript.fsName);
		}
	} catch (error) {
		alert("Критическая ошибка: " + error.message);
	}
	
		// БЛОК ЗАПУСКА СЛЕДУЮЩЕГО СКРИПТА
	try {
		var scriptFile;
		
		// Проверяем, запущен ли скрипт из панели InDesign или из редактора
		try {
			scriptFile = new File(app.activeScript);
		} catch(e) {
			// Если app.activeScript недоступен, берем путь из среды отладки
			scriptFile = new File($.fileName); 
		}

		var scriptFolder = scriptFile.parent; 
		var nextScript = new File(scriptFolder + "/FrameFM.jsx"); 

		if (nextScript.exists) {
			app.doScript(nextScript, ScriptLanguage.JAVASCRIPT);
		} else {
			alert("Ошибка: Скрипт не найден по пути:\n" + nextScript.fsName);
		}
	} catch (error) {
		alert("Критическая ошибка: " + error.message);
	}
}
