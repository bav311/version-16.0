// Проверяем, выделен ли текст
if (app.selection.length > 0 && app.selection[0].hasOwnProperty("paragraphs")) {
    var mySelection = app.selection[0];
    // Применяем объединение колонок ко всем абзацам в выделении
    for (var i = 0; i < mySelection.paragraphs.length; i++) {
        mySelection.paragraphs[i].spanColumnType = SpanColumnTypeOptions.SPAN_COLUMNS;
        mySelection.paragraphs[i].spanSplitColumnCount = SpanColumnCountOptions.ALL;
    }
} else {
    alert("Пожалуйста, выделите текст.");
}