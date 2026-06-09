(function() {
    // Получаем документ: из события (автозапуск) или текущий активный (ручной запуск)
    var doc = (typeof myEventContext !== "undefined" && myEventContext.parent) ? myEventContext.parent : app.activeDocument;
    if (!doc || doc.constructor.name !== "Document") return;

    // --- НАСТРОЙКИ ---
    var pagesToExport = ["7", "8"]; // Список страниц для обработки
    var targetFolderPathIdms = "E://InDesign_Exports"; // Путь для IDMS-сниппетов
    var targetFolderPathPdf = "V://"; // Путь для PDF-страниц
    var labelName = "FileNameFrame"; // Метка фрейма с названием
    var brandName = "Сельская новь"; // Текст, который вырезаем
    var pdfPresetName = "site"; // Имя пресета PDF
    // -----------------

    // Проверяем существование PDF-пресета
    var pdfPreset = app.pdfExportPresets.itemByName(pdfPresetName);
    if (!pdfPreset.isValid) {
        // При автозапуске не используем alert(), чтобы не вешать интерфейс, пишем в лог ошибок
        $.writeln("Ошибка: Пресет PDF '" + pdfPresetName + "' не найден!");
        return;
    }

    // Создаем папки сохранения, если их нет
    var folderIdms = new Folder(targetFolderPathIdms);
    if (!folderIdms.exists) folderIdms.create();
    
    var folderPdf = new Folder(targetFolderPathPdf);
    if (!folderPdf.exists) folderPdf.create();

    var lastFoundName = ""; 
    var log = [];

    for (var p = 0; p < pagesToExport.length; p++) {
        var pageName = pagesToExport[p];
        var page = doc.pages.itemByName(pageName);
        
        if (!page.isValid) {
            log.push("Стр. " + pageName + " не найдена");
            continue; 
        }

        // --- ПОИСК И ОБРАБОТКА ИМЕНИ ---
        var allItems = page.allPageItems;
        for (var i = 0; i < allItems.length; i++) {
            var item = allItems[i];
            if (item.label == labelName && item.hasOwnProperty("contents")) {
                var rawText = item.contents.toString();
                var cleaned = rawText.replace(brandName, ""); 
                cleaned = cleaned.split("(")[0]; 
                cleaned = cleaned.replace(/[\r\n\t\x07\x03]/g, " "); 
                cleaned = cleaned.replace(/[\\\/[:*?"<>|]/g, ""); 
                cleaned = cleaned.replace(/^\s+|\s+$/g, ""); 
                
                if (cleaned !== "") {
                    lastFoundName = cleaned;
                    break;
                }
            }
        }

        var finalBaseName = (lastFoundName !== "") ? lastFoundName : "Page_" + pageName;
        
        // Пути к результирующим файлам
        var fileIdms = new File(folderIdms + "/" + finalBaseName + " стр." + pageName + ".idms");
        var filePdf = new File(folderPdf + "/" + finalBaseName + " стр." + pageName + ".pdf");

        // --- ЭКСПОРТ №1: СНИППЕТЫ (.IDMS) ---
        var toSelect = [];
        var pItems = page.pageItems;
        for (var j = 0; j < pItems.length; j++) {
            var itm = pItems[j];
            if (!itm.locked && !itm.itemLayer.locked && itm.visible && itm.itemLayer.visible) {
                toSelect.push(itm);
            }
        }

        if (toSelect.length > 0) {
            var tempGroup = null;
            try {
                tempGroup = page.groups.add(toSelect);
                tempGroup.exportFile(ExportFormat.INDESIGN_SNIPPET, fileIdms);
                tempGroup.ungroup();
                log.push("Успех IDMS: " + fileIdms.name);
            } catch (e) {
                if (tempGroup && tempGroup.isValid) {
                    try { tempGroup.ungroup(); } catch(err) {}
                }
                log.push("Ошибка IDMS стр. " + pageName + ": " + e.message);
            }
        } else {
            log.push("Стр. " + pageName + ": нет объектов для экспорта IDMS");
        }

        // --- ЭКСПОРТ №2: СТРАНИЦЫ В PDF ---
        try {
            app.pdfExportPreferences.pageRange = pageName;
            app.pdfExportPreferences.viewPDF = false;
            doc.exportFile(ExportFormat.PDF_TYPE, filePdf, false, pdfPreset);
            log.push("Успех PDF: " + filePdf.name);
        } catch (e) {
            log.push("Ошибка PDF стр. " + pageName + ": " + e.message);
        }
    }

    // Оставляем закомментированным, чтобы InDesign работал в тихом автоматическом режиме
    // alert("Готово!\n\n" + log.join("\n"));
})();
