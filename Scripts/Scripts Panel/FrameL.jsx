if (app.documents.length > 0 && app.selection.length > 0) {
    
    var currentSelection = app.selection[0];
    var textFrame = null;
    
    // Определяем целевой текстовый фрейм
    if (currentSelection instanceof TextFrame) {
        textFrame = currentSelection; 
    } else if (currentSelection.hasOwnProperty("parentStory") && currentSelection.parentTextFrames.length > 0) {
        textFrame = currentSelection.parentTextFrames[0]; 
    }
    
    if (textFrame) {
        // Получаем все абзацы, которые физически находятся в этом фрейме
        var frameParagraphs = textFrame.paragraphs;
        var linesCount = 0;
        
        // Вычисляем ширину для этого фрейма
        var bounds = textFrame.geometricBounds;
        var frameWidth = bounds[3] - bounds[1]; // x2 - x1
        
        var inset = textFrame.textFramePreferences.insetSpacing;
        var leftInset = 0;
        var rightInset = 0;
        
        if (inset instanceof Array) {
            leftInset = inset[1];
            rightInset = inset[3];
        } else if (typeof inset === "number") {
            leftInset = inset;
            rightInset = inset;
        }
        
        var lineWidth = frameWidth - (leftInset + rightInset);
        
        if (lineWidth > 0 && frameParagraphs.length > 0) {
            // Перебираем абзацы фрейма с конца к началу
            for (var i = frameParagraphs.length - 1; i >= 0; i--) {
                var currentParagraph = frameParagraphs[i];
                
                // Проверяем, пустой ли абзац
                if (currentParagraph.contents === "\r" || currentParagraph.contents === "") {
                    
                    var lineLocation = currentParagraph.insertionPoints[0];
                    var graphicLine = lineLocation.graphicLines.add();
                    
                    // Применяем рабочие настройки геометрии
                    graphicLine.geometricBounds = [2, 2, 2, lineWidth];
                    graphicLine.strokeWeight = 4; 
                    graphicLine.strokeColor = "Black"; 
                    graphicLine.anchoredObjectSettings.anchoredPosition = AnchorPosition.INLINE_POSITION;
                    
                    linesCount++;
                }
            }
        }
        
        // alert("Готово! Вставлено линий в этот фрейм: " + linesCount);
        
    } else {
        alert("Пожалуйста, выделите текстовый фрейм или поставьте в него курсор.");
    }
} else {
    alert("Пожалуйста, выделите текстовый фрейм.");
}