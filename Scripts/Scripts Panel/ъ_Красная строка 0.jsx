app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Убрать отступ первой строки");

function main() {
    // Проверяем, выбрано ли что-нибудь
    if (app.documents.length == 0 || app.selection.length == 0) {
        alert("Пожалуйста, выделите текстовый фрейм.");
        return;
    }

    var selectedObject = app.selection[0];

    // Проверяем, является ли выделенный объект текстовым фреймом
    if (selectedObject instanceof TextFrame) {
        // Обнуляем отступ первой строки для всех абзацев во фрейме
        selectedObject.paragraphs.everyItem().firstLineIndent = 0;
    } else {
        alert("Выделенный объект не является текстовым фреймом.");
    }
}
