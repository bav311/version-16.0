var win = app.activeWindow;
var current = win.transformReferencePoint;

// Определяем порядок переключения (можно менять местами)
var points = [
	// AnchorPoint.TOP_LEFT_ANCHOR,
    AnchorPoint.TOP_CENTER_ANCHOR,
	AnchorPoint.CENTER_ANCHOR,
	AnchorPoint.BOTTOM_CENTER_ANCHOR
    
];

// Ищем текущую точку в списке и переключаем на следующую
var found = false;
for (var i = 0; i < points.length; i++) {
    if (current == points[i]) {
        win.transformReferencePoint = points[(i + 1) % points.length];
        found = true;
        break;
    }
}

// Если текущей точки нет в списке (например, Center-Top), ставим первую из списка
if (!found) {
    win.transformReferencePoint = points[0];
}
