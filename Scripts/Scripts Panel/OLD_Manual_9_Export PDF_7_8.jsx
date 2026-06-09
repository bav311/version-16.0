var doc = app.activeDocument;

// --- НАСТРОЙКИ ---
var pagesToExport = ["7", "8"]; // Список страниц для обработки
var targetFolderPath = "V://"; // Путь к папке сохранения
var labelName = "FileNameFrame"; // Метка (Script Label) фрейма с названием
var brandName = "Сельская новь"; // Текст, который нужно вырезать из имени
var pdfPresetName = "site"; // Точное имя вашего пресета без квадратных скобок
// -----------------

// Функция для получения даты в формате ДД_ММ_ГГГГ
function getFormattedDate() {
    var d = new Date();
    return ("0" + d.getDate()).slice(-2) + "_" + ("0" + (d.getMonth() + 1)).slice(-2) + "_" + d.getFullYear();
}

// Проверяем существование PDF-пресета
var pdfPreset = app.pdfExportPresets.itemByName(pdfPresetName);
if (!pdfPreset.isValid) {
    alert("Ошибка: Пресет PDF '" + pdfPresetName + "' не найден в системе!");
    exit();
}

// Создаем папку, если её нет
var outputFolder = new Folder(targetFolderPath);
if (!outputFolder.exists) outputFolder.create();

var dateStr = getFormattedDate();
var lastFoundName = ""; // Здесь храним имя для страниц, где нет текстового фрейма
var log = []; // Сюда записываем результаты работы для финального отчета

for (var p = 0; p < pagesToExport.length; p++) {
    var pageName = pagesToExport[p];
    var page = doc.pages.itemByName(pageName);
    
    // Проверка: существует ли страница в документе
    if (!page.isValid) {
        log.push("Стр. " + pageName + " не найдена");
        continue; 
    }

    // --- ПОИСК И ОБРАБОТКА ИМЕНИ ---
    var allItems = page.allPageItems;
    for (var i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        
        // Если нашли объект с нужной меткой и в нем есть текст
        if (item.label == labelName && item.hasOwnProperty("contents")) {
            var rawText = item.contents.toString();
            
            // 1. Удаляем название бренда (Сельская новь)
            var cleaned = rawText.replace(brandName, ""); 
            
            // 2. Отрезаем всё, начиная со скобки "(" и до конца
            cleaned = cleaned.split("(")[0]; 
            
            // 3. Удаляем невидимые символы InDesign (переносы, концы статей и т.д.)
            cleaned = cleaned.replace(/[\r\n\t\x07\x03]/g, " "); 
            
            // 4. Удаляем символы, запрещенные в именах файлов Windows \ / : * ? " < > |
            cleaned = cleaned.replace(/[\\\/[:*?"<>|]/g, ""); 
            
            // 5. Убираем лишние пробелы по краям
            cleaned = cleaned.replace(/^\s+|\s+$/g, ""); 
            
            if (cleaned !== "") {
                lastFoundName = cleaned; // Запоминаем это имя
                break; // Выходим из поиска на этой странице
            }
        }
    }

    // Если на текущей странице имя не найдено, берем имя с прошлой страницы или пишем "Page_X"
    var finalBaseName = (lastFoundName !== "") ? lastFoundName : "Page_" + pageName;
    
    // Формируем итоговое имя файла
    var fileName = finalBaseName + " стр." + pageName + ".pdf";
    var outputFile = new File(outputFolder + "/" + fileName);

    // --- НАСТРОЙКА ДИАПАЗОНА И ЭКСПОРТ В PDF ---
    try {
        // Указываем InDesign, какую конкретно страницу экспортировать
        app.pdfExportPreferences.pageRange = pageName;
        
        // Отключаем открытие PDF в Акробате/браузере после сохранения
        app.pdfExportPreferences.viewPDF = false;
        
        // Запускаем экспорт страницы с выбранным пресетом
        doc.exportFile(ExportFormat.PDF_TYPE, outputFile, false, pdfPreset);
        
        log.push("Успех: " + fileName);
    } catch (e) {
        log.push("Ошибка на стр. " + pageName + ": " + e.message);
    }
}

// Показываем финальный отчет
alert("Готово!\n\n" + log.join("\n"));
