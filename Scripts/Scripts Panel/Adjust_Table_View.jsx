// AdjustView.jsx

/*
    
Точная настройка вида таблицы, справка на кнопке [ ? ]

*/

#targetengine "AdjustView" 
 
var programTitul = "Точная настройка вида таблицы";
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; // см. http://adobeindesign.ru/2008/10/24/restore-ui/ 
if (app.documents.length == 0) {
    alert ("Нет открытого документа.",programTitul);
    exit();
    }
var doc = app.activeDocument;
var sel = app.selection[0];
var plusAction;
var theCell;
var cancelAutoLeading = false;

var erMes1 = "Ничего не выделено";
var erMes2 = "Надо выделить ячейки для обработки";
var erMes3 = "Автоматический интерлиньяж заменяется на абсолютный";
var erMes4 = "Высота строки не должна быть меньше 8 пт";
var erMes5 = "Зачем в таблице интерлиньяж меньше 5 пт";

var w = new Window ("palette", programTitul);
w.alignChildren =  ["left", "top"];
var insets = w.add("radiobutton", undefined, "Отступы в выделенных ячейках");
var insetsGroup = w.add("group");
insetsGroup.orientation = "row";
var insetTop = insetsGroup.add("checkbox", undefined, "сверху");
var insetBottom = insetsGroup.add("checkbox", undefined, "снизу");
var insetLeft = insetsGroup.add("checkbox", undefined, "слева");
var insetRight = insetsGroup.add("checkbox", undefined, "справа");
insetsGroup.enabled = false;

separator0 = w.add ("panel");
separator0.minimumSize.height = separator0.maximumSize.height = 1;
separator0.alignment = ["fill", "fill"];
var groupIntWidth = w.add("group");
groupIntWidth.orientation = "row";
var leading = groupIntWidth.add("radiobutton", undefined, "Интерлиньяж");
separatorH = groupIntWidth.add ("panel");
separatorH.minimumSize.width = separatorH.maximumSize.width = 1;
separatorH.alignment = ["fill", "fill"];
var rowHeight = groupIntWidth.add("radiobutton", undefined, "Высота строки");
rowHeight.value = true;
separator1 = w.add ("panel");
separator1.minimumSize.height = separator1.maximumSize.height = 1;
separator1.alignment = ["fill", "fill"];
w.add("statictext", undefined, "Шаг изменения, пт");
var rbValues = w.add("group");
rbValues.orientation = "row";
rbValues.margins = [0,5,0,0];
var step_0_1 = rbValues.add("radiobutton", undefined, "0,1");
var step_0_25 = rbValues.add("radiobutton", undefined, "0,25");
var step_0_5 = rbValues.add("radiobutton", undefined, "0,5");
var step_1_0 = rbValues.add("radiobutton", undefined, "1,0");
var step_2_5 = rbValues.add("radiobutton", undefined, "2,5");
step_2_5.value = true;
var step_5_0 = rbValues.add("radiobutton", undefined, "5,0");
separator2 = w.add ("panel");
separator2.minimumSize.height = separator2.maximumSize.height = 1;
separator2.alignment = ["fill", "fill"];
var buttonSize = [0,0,110,28];
var twoGroups = w.add("group");
twoGroups.orientation = "row";
twoGroups.alignment = ["center", "center"];
var plus_minusGroup = twoGroups.add("group");
plus_minusGroup.orientation = "row";
var plus = plus_minusGroup.add("button", buttonSize, "Увеличить");
var minus = plus_minusGroup.add("button", buttonSize, "Уменьшить"); 
var infoGroup = twoGroups.add("group");
var info = infoGroup.add("button", [0, 0, 28, 28], "?"); 
///
info.onClick = function () { // info.onClick 
var textInfo;    
var textInfo1 = "\n== Назначение скрипта ==\nЭта программа для точной настройки вида отдельных ячеек таблицы. Можно менять отступы в ячейках, интерлиньяж, высоту строки таблицы. Величину изменения параметра определяет пользователь, действие распространяется на выбранные ячейки.\n\n== Отступы в выделенных ячейках ==\nПри изменении анализируется очередное значение отступа: 1) не станет ли это число отрицательным; 2) не появится ли в ячейке вытеснение текста при таком значении. При возникновении любого из этих случаев новое значение не будет заменять предыдущее, при котором данной проблемы нет.\n\n== Интерлиньяж  ==\nСразу изменяется, если интерлиньяж определён как конкретный. Если он автоматический, то будет сообщение об этом (один раз для выделенных ячеек), затем для каждой ячейки автоматический интерлиньяж пересчитывается в абсолютный, и только после этого изменяется.\nПрограмма не позволит уменьшить интерлиньяж до значения меньше 5 пт.\n\n== Высота строки ==\nБез каких-либо вариантов работает увеличение выделенных строк. А то, как выполняется уменьшение, зависит от настроек таблицы. Если включено автоматическое изменение высоты ячейки ('Параметры ячейки' > 'Строки и столбцы' > 'Высота строки : не менее'), то высота будет изменяться до тех пор, пока не будет достигнута высота имеющегося там текста. И дальше уменьшаться не будет. С этом вариантом параметров ячейки вытесненного текста не бывает.\nЕсли высота ячейки установлена ('Параметры ячейки' > 'Строки и столбцы' > 'Высота строки : точно'), то в этом случае высота строки будет уменьшаться, даже если в ячейках исчезает текст.\nВысота строки не будет меньше 8 пт.\n\n== Процесс выполнения ==\nНа время пересчёта кнопки 'Увеличить' и 'Уменьшить' недоступны, и надо нажимать их, только когда они активны. Нажатие в период, когда видно, что кнопки недоступны, вредно в плане работы, поскольку факты нажатия запоминаются, а потом исполняются. В результате будет сделано больше изменений, чем требуется. Придётся возвращать назад, а это ненужная потеря времени.\n\n== Как вернуться и попробовать с другими установками ==\nВ скрипте есть функция отката, ставите курсор в текст, нажимаете Ctrl+Z, и будет снято сделанное скриптом изменение.\n\n\n© Михаил Иванюшин. 2023  |  https://dotextok.ru  |  dotextok@gmail.com\n\n------------\n\nhttps://dotextok.ru/tegi/tablitsy/  — эту ссылку можно выделить на экране и взять в буфер, чтобы перейти на сайт.";
var textInfo2 = "\nЕсли в вашей вёрстке таблицы встречаются часто, то познакомьтесь с этими решениями. Обычно оформление таблиц в индизайне ассоциируется с кропотливой, утомительной и долгой работой. А с использованием этих программ вёрстка таблиц будет не в тягость, а в радость.\nНу примерно так, как вы этим скриптом точной настройки изменяете вид таблицы, меняя её отдельные параметры.\nДо нового года их можно купить с 15% скидкой.\nПромокод: tab_2023_15 его можно взять в буфер с экрана.\n";
var wn = new Window ("dialog", programTitul);
var wHeight;
var data = new Date();
var year = data.getFullYear();
if (year == 2023) { wHeight = 650; textInfo = textInfo1 + textInfo2; } else { wHeight = 570; textInfo = textInfo1; }
var data = wn.add("edittext", [0, 0, 850, wHeight], textInfo, {multiline: true});
wn.layout.layout();
wn.show();
return;
} // info.onClick
///
insetTop.onClick = function () { // insetTop
if (insetTop.value) plus_minusGroup.enabled = true;
else if (!insetTop.value && !insetBottom.value && !insetLeft.value && !insetRight.value) plus_minusGroup.enabled = false; else plus_minusGroup.enabled = true; 
} // insetTop 
///
insetBottom.onClick = function () { // insetBottom
if (insetBottom.value) plus_minusGroup.enabled = true;
else if (!insetTop.value && !insetBottom.value && !insetLeft.value && !insetRight.value) plus_minusGroup.enabled = false; else plus_minusGroup.enabled = true; 
} // insetBottom 
///
insetLeft.onClick = function () { // insetLeft
if (insetLeft.value) plus_minusGroup.enabled = true;
else if (!insetTop.value && !insetBottom.value && !insetLeft.value && !insetRight.value) plus_minusGroup.enabled = false; else plus_minusGroup.enabled = true; 
} // insetLeft 
///
insetRight.onClick = function () { // insetRight
if (insetRight.value) plus_minusGroup.enabled = true;
else if (!insetTop.value && !insetBottom.value && !insetLeft.value && !insetRight.value) plus_minusGroup.enabled = false; else plus_minusGroup.enabled = true; 
} // insetRight 
///
leading.onClick = function () { // leading
rowHeight.value = false;    
insets.value = false;
insetsGroup.enabled = false;
plus_minusGroup.enabled = true;
} // leading
////
rowHeight.onClick = function () { // rowHeight
leading.value = false;    
insets.value = false;
insetsGroup.enabled = false;
plus_minusGroup.enabled = true;
} // rowHeight
////
insets.onClick = function() { // insets
rowHeight.value = false;       
leading.value = false;
insetsGroup.enabled = true;
if (!insetTop.value && !insetBottom.value && !insetLeft.value && !insetRight.value) plus_minusGroup.enabled = false; else plus_minusGroup.enabled = true;
}  // insets
///
plus.onClick = function () {//  plus 
plusAction = true;    
sel = app.selection[0];
if (sel == null) {
    errMes(erMes1);    
    return;
    }
if (sel.constructor.name  != "Cell" && sel.constructor.name  != "Table") {   
    errMes(erMes2);    
    return;
    }
///
app.doScript(doPlus, ScriptLanguage.JAVASCRIPT , [], UndoModes.ENTIRE_SCRIPT, "do_plus"); 
return;
///
function doPlus() { // doPlus
if (rowHeight.value) { // rowHeight
var r_h;
var vert = app.activeDocument.viewPreferences.verticalMeasurementUnits;
var hor = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
plus_minusGroup.enabled = false;
for (i = 0; i < sel.rows.length; i++) { // i++
    r_h = sel.rows[i].height;
    if (step_0_1.value) { r_h = r_h + Number(0.1); }
    if (step_0_25.value) { r_h = r_h + Number(0.25); }
    if (step_0_5.value) { r_h = r_h + Number(0.5); }    
    if (step_1_0.value) { r_h = r_h + Number(1); }  
    if (step_2_5.value) { r_h = r_h + Number(2.5); }      
    if (step_5_0.value) { r_h = r_h + Number(5); }
    sel.rows[i].height = r_h;    
    } // i++
app.activeDocument.viewPreferences.verticalMeasurementUnits = vert;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = hor;
plus_minusGroup.enabled = true;
return;
} // rowHeight
///
if (insets.value) { // insets    
    plus_minus_action();
    return;
    }
if (leading.value) { // leading
    var prev_leads;
    plus_minusGroup.enabled = false;     
    for (i = 0; i < sel.cells.length; i++) { // i++
        theCell = sel.cells[i];
        prev_leads = theCell.texts[0].leading;
        if (prev_leads.valueOf() == 1635019116) { // 1635019116 - автоматический интерлиньяж
            if (cancelAutoLeading == false) {
                errMes(erMes3); 
                cancelAutoLeading = true;
                }
            var ps = theCell.texts[0].insertionPoints[0].pointSize;
            var autoLead = theCell.texts[0].insertionPoints[0].autoLeading;
            var usedLead = (ps*autoLead/100).toFixed(1);       
            prev_leads = Number(usedLead); 
            }
        var leads = prev_leads;
        theCell.texts[0].leading = leads;        
        if (step_0_1.value) { leads = leads + Number(0.1); }
        if (step_0_25.value) { leads = leads + Number(0.25); }
        if (step_0_5.value) { leads = leads + Number(0.5); }        
        if (step_1_0.value) { leads = leads + Number(1); } 
        if (step_2_5.value) { leads = leads + Number(2.5); }          
        if (step_5_0.value) { leads = leads + Number(5); }
        theCell.texts[0].leading = leads;
        } // i++
    plus_minusGroup.enabled = true; 
    cancelAutoLeading = false;
    return;
    } // leading
} // doPlus
} // plus
////
minus.onClick = function () { // minus
plusAction = false;    
sel = app.selection[0];
if (sel == null) {
    errMes(erMes1);    
    return;
    }
if (sel.constructor.name  != "Cell" && sel.constructor.name  != "Table") {
    errMes(erMes2);    
    return;
    }
///
app.doScript(doMinus, ScriptLanguage.JAVASCRIPT , [], UndoModes.ENTIRE_SCRIPT, "do_minus"); 
return;
///
function doMinus() { // doMinus
if (rowHeight.value) { // rowHeight
var r_h, r_h_prev;
var vert = app.activeDocument.viewPreferences.verticalMeasurementUnits;
var hor = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
plus_minusGroup.enabled = false;
for (i = 0; i < sel.rows.length; i++) { // i++
    r_h = sel.rows[i].height;
    r_h_prev = sel.rows[i].height;
    if (step_0_1.value) { r_h = r_h - 0.1; }
    if (step_0_25.value) { r_h = r_h - 0.25; }
    if (step_0_5.value) { r_h = r_h - 0.5; }    
    if (step_1_0.value) { r_h = r_h - 1; }  
    if (step_2_5.value) { r_h = r_h - 2.5; }      
    if (step_5_0.value) { r_h = r_h - 5; }
    if (r_h < 8) {
        errMes(erMes4); 
        app.activeDocument.viewPreferences.verticalMeasurementUnits = vert;
        app.activeDocument.viewPreferences.horizontalMeasurementUnits = hor;            
        plus_minusGroup.enabled = true;             
        return;          
        }
    else sel.rows[i].height = r_h;    
    } // i++
app.activeDocument.viewPreferences.verticalMeasurementUnits = vert;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = hor;
plus_minusGroup.enabled = true;
return;
} // rowHeight
/////
if (insets.value) { // insets       
    plus_minus_action();  
    }
if (leading.value) { // leading
    var prev_leads;    
    plus_minusGroup.enabled = false;    
    for (i = 0; i < sel.cells.length; i++) { // i++
        theCell = sel.cells[i];
        prev_leads = theCell.texts[0].leading;
        if (prev_leads.valueOf() == 1635019116) { // 1635019116 - автоматический интерлиньяж
            if (cancelAutoLeading == false) {
                errMes(erMes3); 
                cancelAutoLeading = true;
                }
            var ps = theCell.texts[0].insertionPoints[0].pointSize;
            var autoLead = theCell.texts[0].insertionPoints[0].autoLeading;
            var usedLead = (ps*autoLead/100).toFixed(1);       
            prev_leads = Number(usedLead); 
            }
        var leads = prev_leads;
        theCell.texts[0].leading = leads;        
        if (step_0_1.value) { leads = leads - 0.1; }
        if (step_0_25.value) { leads = leads - 0.25; }
        if (step_0_5.value) { leads = leads - 0.5;}         
        if (step_1_0.value) { leads = leads -1; }  
        if (step_2_5.value) { leads = leads -2.5; }          
        if (step_5_0.value) { leads = leads - 5; }
        if (leads <5) {
            errMes(erMes5); 
            plus_minusGroup.enabled = true;  
            cancelAutoLeading = false;            
            return;       
            }
        theCell.texts[0].leading = leads;
        } // i++
    plus_minusGroup.enabled = true; 
    cancelAutoLeading = false;    
    return;    
    } // leading
}  // doMinus
} // minus    
function plus_minus_action() { // plus_minus_action
plus_minusGroup.enabled = false;

var celIndx = [];
while (celIndx.length > 0) celIndx.pop();
for (i = 0; i < sel.cells.length; i++) { // i++
    theCell = sel.cells[i];
    if (theCell.texts[0].length == 0) continue;
    celIndx.push(theCell.index);
    } // i++

var vert = app.activeDocument.viewPreferences.verticalMeasurementUnits;
var hor = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
if (insetTop.value) { cellAdjust (celIndx, "topInset", plusAction); }
if (insetBottom.value) { cellAdjust (celIndx, "bottomInset", plusAction); }
if (insetLeft.value) { cellAdjust (celIndx, "leftInset", plusAction); }
if (insetRight.value) { cellAdjust (celIndx, "rightInset", plusAction); }  
app.activeDocument.viewPreferences.verticalMeasurementUnits = vert;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = hor;  
plus_minusGroup.enabled = true;
} // plus_minus_action
////
function cellAdjust (celIndx, item, operation) { // cellAdjust
var size, prev_size;    
for (i = 0; i < celIndx.length; i++) { // i++
        if (item == "topInset") size = sel.cells[celIndx[i]].topInset;
        if (item == "bottomInset") size = sel.cells[celIndx[i]].bottomInset; 
        if (item == "leftInset") size = sel.cells[celIndx[i]].leftInset;  
        if (item == "rightInset") size = sel.cells[celIndx[i]].rightInset; 
        prev_size = size;
        if (operation == true) { // plusAction
        if (step_0_1.value) { size = size + Number(0.1); }
        if (step_0_25.value) { size = size + Number(0.25); }
        if (step_0_5.value) { size = size + Number(0.5);  }            
        if (step_1_0.value) { size = size + Number(1); } 
        if (step_2_5.value) { size = size + Number(2.5); }          
        if (step_5_0.value) { size = size + Number(5); }
        } // plusAction
        else { // minus
        if (step_0_1.value) { if (size - 0.1 >= 0) size = size - 0.1; }
        if (step_0_25.value) { if (size - 0.25 >= 0) size = size -0.25; }
        if (step_0_5.value) { if (size - 0.5 >= 0) size = size -0.5; }         
        if (step_1_0.value) { if (size - 1 >= 0) size = size -1; } 
        if (step_2_5.value) { if (size - 2.5 >= 0) size = size -2.5; }          
        if (step_5_0.value) {  if (size - 5 >= 0) size = size -5; }                   
        } // minus
    if (item == "topInset") { sel.cells[celIndx[i]].topInset = size; sel.cells[celIndx[i]].recompose(); if (sel.cells[celIndx[i]].overflows) sel.cells[celIndx[i]].topInset = prev_size; }
    if (item == "bottomInset") { sel.cells[celIndx[i]].bottomInset = size; sel.cells[celIndx[i]].recompose(); if (sel.cells[celIndx[i]].overflows) sel.cells[celIndx[i]].bottomInset = prev_size; }  
    if (item == "leftInset") { sel.cells[celIndx[i]].leftInset = size; sel.cells[celIndx[i]].recompose(); if (sel.cells[celIndx[i]].overflows) sel.cells[celIndx[i]].leftInset = prev_size; } 
    if (item == "rightInset") { sel.cells[celIndx[i]].rightInset = size; sel.cells[celIndx[i]].recompose(); if (sel.cells[celIndx[i]].overflows) sel.cells[celIndx[i]].rightInset = prev_size; } 
    } // i++
app.activate();
} // cellAdjust
///
w.show();
////
function errMes (message) { // errMes
var ewin = new Window ("palette", message, {x:0, y:0, width:450, height:12}); 
ewin.center();
ewin.show();
ewin.update();   
$.sleep(1000);
ewin.close();
return;
} // errMes
