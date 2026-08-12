app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Умное сравнение фреймов");

function main() {
    if (app.documents.length == 0) {
        alert("Откройте документ.");
        return;
    }

    var doc = app.activeDocument;
    var selection = app.selection;

    if (selection.length != 2 || !(selection[0] instanceof TextFrame) || !(selection[1] instanceof TextFrame)) {
        alert("Пожалуйста, выделите ровно два текстовых фрейма.");
        return;
    }

    // Создаем или находим красный цвет
    var redColor = doc.colors.item("Red_Error");
    if (!redColor.isValid) {
        redColor = doc.colors.add({
            name: "Red_Error",
            model: ColorModel.PROCESS,
            space: ColorSpace.CMYK,
            colorValue: [0, 100, 100, 0]
        });
    }

    // Первый выделенный фрейм — эталон, второй — проверяемый
    var frame1 = selection[0];
    var frame2 = selection[1];

    // Сбрасываем цвет текста во втором фрейме на черный перед проверкой
    frame2.texts[0].fillColor = doc.colors.item("Black");

    var words1 = frame1.words;
    var words2 = frame2.words;

    var minWords = Math.min(words1.length, words2.length);

    // Сравнение по словам
    for (var i = 0; i < minWords; i++) {
        // Очищаем слова от пробелов и невидимых символов для точного сравнения
        var w1 = words1[i].contents.replace(/\s+/g, "");
        var w2 = words2[i].contents.replace(/\s+/g, "");

        if (w1 !== w2) {
            words2[i].fillColor = redColor;
        }
    }

    // Если во втором фрейме слов больше, прокрашиваем остаток
    if (words2.length > words1.length) {
        for (var j = words1.length; j < words2.length; j++) {
            words2[j].fillColor = redColor;
        }
    }

    alert("Проверка по словам завершена! Ошибки выделены.");
}
