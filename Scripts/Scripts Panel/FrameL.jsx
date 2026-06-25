try {
    // Очищаем настройки поиска текста и GREP
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;

           
        // Включаем нижнюю линию абзаца (теперь метод .item(0) дал прямой доступ к свойству)
        currentParagraph.ruleBelow = true; 
        
        // --- НАСТРОЙКА ВНЕШНЕГО ВИДА ЛИНИЙ ---
        currentParagraph.ruleBelowWeight = 2;                     // Толщина линии в pt
        currentParagraph.ruleBelowType = "Solid";                 // Тип линии (Сплошная)
        currentParagraph.ruleBelowColor = "Black";                // Цвет линии из палитры Swatches
        currentParagraph.ruleBelowWidth = RuleWidth.COLUMN_WIDTH; // На всю ширину колонки фрейма
        currentParagraph.ruleBelowOffset = 0;                     // Смещение линии относительно текста
        
        // --- РАЗДВИГАЕМ СОСЕДНИЕ ЛИНИИ ДРУГ ОТ ДРУГА ---
        currentParagraph.pointSize = 6;                           // Физическая высота пустого абзаца 6pt
        currentParagraph.leading = 6;                             // Интерлиньяж строки 6pt
        currentParagraph.spaceBefore = 0;                         // Обнуляем отступ до линии
        currentParagraph.spaceAfter = 4;                          // Расстояние после каждой из линий
    }

    alert("Все линии успешно созданы! Обработано слов line: " + foundItems.length);

} catch (error) {
    alert("Ошибка при выполнении: " + error.message);
}
