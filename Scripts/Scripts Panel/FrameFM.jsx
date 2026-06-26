if (app.documents.length > 0 && app.selection.length > 0) {
    
    var currentSelection = app.selection[0];
    var mainTextFrame = null;
    
    // Проверяем, что выделен именно текстовый фрейм (или курсор внутри него)
    if (currentSelection instanceof TextFrame) {
        mainTextFrame = currentSelection; 
    } else if (currentSelection.hasOwnProperty("parentStory") && currentSelection.parentTextFrames.length > 0) {
        mainTextFrame = currentSelection.parentTextFrames[0]; 
    }
    
    if (mainTextFrame) {
        // Получаем коллекцию всех прямоугольников внутри этого текстового фрейма
        var anchoredRectangles = mainTextFrame.rectangles;
        var movedCount = 0;
        
        // Цикл по всем найденным прямоугольникам
        for (var i = 0; i < anchoredRectangles.length; i++) {
            var currentRect = anchoredRectangles[i];
            
            // Проверяем, является ли прямоугольник действительно привязанным (anchored/inline)
            if (currentRect.anchoredObjectSettings.anchoredPosition === AnchorPosition.INLINE_POSITION || 
                currentRect.anchoredObjectSettings.anchoredPosition === AnchorPosition.ANCHORED) {
                
                var anchorSettings = currentRect.anchoredObjectSettings;
                
                // Сдвигаем вниз на 32 мм относительно текущего положения объекта
                anchorSettings.anchorYoffset = anchorSettings.anchorYoffset - 32;
                
                movedCount++;
            }
        }
        
        // alert("Готово! Внутри фрейма найдено и сдвинуто объектов: " + movedCount);
        
    } else {
        alert("Пожалуйста, выделите общий текстовый фрейм (или поставьте в него курсор).");
    }
} else {
    alert("Пожалуйста, выделите текстовый фрейм.");
}
