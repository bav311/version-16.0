// SpecialPunctuation.jsx

/*
    
11.02.2023    
Информация на кнопке [ ? ]  

Можно посмотреть, как сделано тут, и  это непривычно, что есть пробелы до и после двоеточия и точки с запятой.
https://yspu.org/Оформление_списка_литературы
*/

#targetengine "SpecialPunctuation" 

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; // см. http://adobeindesign.ru/2008/10/24/restore-ui/

var programTitul = "Предписанная пунктуация";
////////
if(app.documents.length == 0) {
alert("Нет открытого документа.", programTitul);	
exit();    
}
var punctuationName = "#punctuation"; // название условного текста, использующегося для маркировки двоеточия и пробелов рядом с ним. Объяснение в справке [?]
///
var w = new Window ("palette",programTitul);
w.alignChildren = "left";
var slashSets = w.add("group");
slashSets.orientation = "row";
var slash = slashSets.add("radiobutton", undefined, "Косая черта");
slash.value = true;
var redColor = [1, 0, 0];
var kernValue = -250;
var slashKern = slashSets.add("checkbox", undefined, "Кернинг между линиями");
var inputField = slashSets.add("group");
inputField.margins = [0, 0, 0, 7];
var inputKern = inputField.add("edittext {justify: 'center'}", [0,0,40,20]);
inputKern.text = kernValue;
inputKern.enabled = false;
inputKern.helpTip = "Допустимый диапазон от -50 до -400";
var qwe = inputField.add("statictext", [0,0,12,28], "\u00A0");
separator2 = w.add ("panel"); 
separator2.minimumSize.height = separator2.maximumSize.height = 1;
separator2.alignment = ["fill", "fill"]; 
var rbSize = [0,0,32,28];
var anotherCharsGroup1 = w.add("group");
anotherCharsGroup1.alignment = ["fill", "fill"];
anotherCharsGroup1.orientation = "row";

var anotherCharsGroup2 = w.add("group");
anotherCharsGroup2.orientation = "row";
anotherCharsGroup2.alignChildren = "left";
var charSize = [0,0,52,28];
var dot = anotherCharsGroup1.add("radiobutton", charSize, "."); 
var comma = anotherCharsGroup1.add("radiobutton", charSize, ",");
var semicolon = anotherCharsGroup1.add("radiobutton", charSize, ";");  
var parenthesis = anotherCharsGroup1.add("radiobutton", charSize, "( )");
var brackets = anotherCharsGroup1.add("radiobutton", charSize, "[ ]");
var ellipsis = anotherCharsGroup2.add("radiobutton", charSize, "…");
var plus = anotherCharsGroup2.add("radiobutton", charSize, "+");
var equal = anotherCharsGroup2.add("radiobutton", charSize, "=");
var colon = anotherCharsGroup2.add("radiobutton", charSize, ":");
var tire = anotherCharsGroup2.add("radiobutton", undefined, "Тире");

separator3 = w.add ("panel"); 
separator3.minimumSize.height = separator3.maximumSize.height = 1;
separator3.alignment = ["fill", "fill"]; 
var slashSpace = w.add("group");
slashSpace.orientation = "row";
slashSpace.add("statictext", undefined, "Используемый пробел");
var slashRbGroup = slashSpace.add("group");
slashRbGroup.margins = [0, 5, 0, 0];
var spaceCommon = slashRbGroup.add("radiobutton", undefined, "обычный");
var spaceNobreak = slashRbGroup.add("radiobutton", undefined, "неразрывный");
spaceNobreak.value = true;
////
var extraPanel = w.add("panel", undefined, "Дополнительное оформление"); 
extraPanel.alignment = ["fill", "fill"];
extraPanel.alignChildren = "left";
var defisGroup = extraPanel.add("group");
defisGroup.margins = [0, 12, 0, 0];
var defis = defisGroup.add("checkbox", undefined, "Между числами дефис");
///
separator4 = extraPanel.add ("panel"); 
separator4.minimumSize.height = separator4.maximumSize.height = 1;
separator4.alignment = ["fill", "fill"]; 
var clearInitials =extraPanel.add("checkbox", undefined, "Убрать пробел между инициалами");
var initialsGroup = extraPanel.add("group");
initialsGroup.orientation = "row";
var asPushkin = initialsGroup.add("radiobutton", undefined, "А.С. Пушкин");
var pushkinAS = initialsGroup.add("radiobutton", undefined, "Пушкин А.С.");
pushkinAS.value = true;
initialsGroup.enabled = false;
///
var buttons = w.add("group");
buttons.orientation = "row";
buttons.alignment = ["center", "fill"]; 
var info = buttons.add("button", [0,0,28,28], "?");
var nameIdle = "Обработать выделенный текст";
var nameProcess = "Обработка";
var action = buttons.add("button", [0,0,240,28]);
action.text = nameIdle;
var hide = buttons.add("button", [0,0,28,28], "…");
///
dot.onClick = function() { // dot.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = true;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // dot.onClick
///
comma.onClick = function() { // comma.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = true;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // comma.onClick
///
semicolon.onClick = function() { // semicolon.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = true;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // semicolon.onClick
///
ellipsis.onClick = function() { // ellipsis.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = true;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // ellipsis.onClick
///
parenthesis.onClick = function() { // parenthesis.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = true;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // parenthesis.onClick
///
brackets.onClick = function() { // brackets.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = true;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // brackets.onClick
///
plus.onClick = function() { // plus.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = true;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // plus.onClick
///
equal.onClick = function() { // equal.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = true;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // equal.onClick
///
inputKern.onChanging = function () { // inputKern.onChanging   
var valid = /^[-\d]+$/.test (inputKern.text) && !isNaN(inputKern.text) && Number(inputKern.text) < 0; 
if ((Number(inputKern.text) > -50) || (Number(inputKern.text) < -400)) valid = false;
if (valid == false) {
    qwe.text = "?";
    qwe.graphics.foregroundColor = qwe.graphics.newPen (w.graphics.PenType.SOLID_COLOR, redColor, 1);
    action.enabled = false;
    }
else { 
        qwe.text = " ";     
        action.enabled = true; 
        }
} // inputKern.onChanging
///
slashKern.onClick = function () { // slashKern.onClick
if (slashKern.value == false) {
    action.enabled = true; 
    qwe.text = " ";
    inputKern.enabled = false;
    return;
    }
inputKern.enabled = true;
var valid = /^[-\d]+$/.test (inputKern.text) && !isNaN(inputKern.text) && Number(inputKern.text) < 0; 
if ((Number(inputKern.text) > -50) || (Number(inputKern.text) < -400)) valid = false;
if (valid == false) {
    qwe.text = "?";
    qwe.graphics.foregroundColor = qwe.graphics.newPen (w.graphics.PenType.SOLID_COLOR, redColor, 1);
    action.enabled = false;
    }
return;
} // slashKern.onClick
///
tire.onClick = function() { // tire.onClick
tire.value = true;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // tire.onClick
///
colon.onClick = function() { // colon.onClick
tire.value = false;
colon.value = true;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
} // colon.onClick
///
slash.onClick = function() { // slash.onClick
tire.value = false;
colon.value = false;
slash.value = true;
slashKern.enabled = true;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
clearInitials.value = false;
initialsGroup.enabled = false;
if (slashKern.value == false) {
    action.enabled = true; 
    qwe.text = " ";
    inputKern.enabled = false;
    return;
    }
inputKern.enabled = true;
var valid = /^[-\d]+$/.test (inputKern.text) && !isNaN(inputKern.text) && Number(inputKern.text) < 0; 
if ((Number(inputKern.text) > -50) || (Number(inputKern.text) < -400)) valid = false;
if (valid == false) {
    qwe.text = "?";
    qwe.graphics.foregroundColor = qwe.graphics.newPen (w.graphics.PenType.SOLID_COLOR, redColor, 1);
    action.enabled = false;
    }
} // slash.onClick
////
clearInitials.onClick = function() { // clearInitials.onClick
tire.value = false;
colon.value = false;
slash.value = false;
qwe.text = " ";
inputKern.enabled = false;
slashKern.enabled = false;
action.enabled = true; 
///
dot.value = false;
comma.value = false;    
semicolon.value = false;
ellipsis.value = false;
parenthesis.value = false;
brackets.value = false;
plus.value = false;
equal.value = false;
///
if (clearInitials.value == false) {
    initialsGroup.enabled = false; 
    action.enabled = false; 
    }
else initialsGroup.enabled = true;
} // clearInitials.onClick
////
action.onClick = function () { // action.onClick
var sel = app.selection[0];
sel.noBreak = false;
var fixSpace = "\u00A0"; // неразрывный изменяемый пробел
if (sel == null || (sel.constructor.name != "Word" && sel.constructor.name != "Paragraph" && sel.constructor.name != "Text" && sel.constructor.name != "TextColumn" && sel.constructor.name != "TextStyleRange")) {
    alert("Перед запуском скрипта должен быть выделен текст.", programTitul);
    return;    
    }
action.text = nameProcess;
app.doScript( predPunct, ScriptLanguage.JAVASCRIPT , [], UndoModes.ENTIRE_SCRIPT, "predPunct");
app.findGrepPreferences = app.changeGrepPreferences = null; 
action.text = nameIdle;
return;
/////
function predPunct() { // predPunct
var story = sel.parent;
var usedSpace = " ";
if (spaceNobreak.value) usedSpace = fixSpace; 
if (clearInitials.value) { // clearInitials.value
    if (asPushkin.value) { // asPushkin.value
        app.findGrepPreferences = app.changeGrepPreferences = null;  
        app.findChangeGrepOptions.includeFootnotes = true;    
        app.findGrepPreferences.findWhat = "(\\u\\.)(\\h*)(\\u\\.)(\\h)(\\u\\l+)";
        app.changeGrepPreferences.changeTo = "$1$3" + usedSpace + "$5";
        sel.changeGrep();
        return;
        } // asPushkin.value
    else {
      // Пушкин А.С.  
        app.findGrepPreferences = app.changeGrepPreferences = null;  
        app.findChangeGrepOptions.includeFootnotes = true;    
        app.findGrepPreferences.findWhat = "(\\u\\l+[-~~\\l\\u]*)(\\h)(\\u\\.)(\\h*)(\\u\\.)"; //  [-~~\\l\\u]*  фамилия может быть двойной, и разделитель между фамилиями может быть как обычным дефисом, так и неразрывным
        app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$3$5";
        sel.changeGrep();
        return;        
        }
    // звёздочка в (\\h*) дя того, чтобы этим же запросом менять вид пробела между фамилией и инициалами. За счёт звёздочки - необязательности наличия данной шпации -- этот запрос выполняется всегда. И всегда будет подставлено установенное сейчас usedSpace
    } // clearInitials.value
///
if (defis.value) { // defis
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;    
    app.findGrepPreferences.findWhat = "(\\d)([‑-—–])(\\d)";
    app.changeGrepPreferences.changeTo = "$1‑$3";
    sel.changeGrep(); 
    defis.value = false;
    return;
    } // defis
///
if (tire.value) { // tire.value
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;    
    app.findGrepPreferences.findWhat = "(\\S)([—–])";
    app.changeGrepPreferences.changeTo = "$1" + fixSpace + "$2";
    sel.changeGrep(); 
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "([—–])(\\S)";
    app.changeGrepPreferences.changeTo = "$1" + " " + "$2";
    sel.changeGrep();  
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;     
    app.findGrepPreferences.findWhat = "(\\h)([—–])(\\h)";
    app.changeGrepPreferences.horizontalScale = 100;
    sel.changeGrep(); 
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;    
    app.findGrepPreferences.findWhat = "([—–])";
    var tireRez = sel.findGrep(); 
    if (tireRez.length == 0) return; // конечно, тут равенства 0 быть не может. Это строка этапа отладки.
    for (var i = tireRez.length-1; i >= 0; i--) {
        var tireIndex = tireRez[i].index;
        story.characters[tireIndex-1].contents = fixSpace;
        story.characters[tireIndex+1].contents = " ";        
        }
    return;
    } // tire.value
///
if (colon.value) { // colon.value     
    var myCondition = app.activeDocument.conditions.item(punctuationName);
    if ( !myCondition.isValid ) var myCondition = app.activeDocument.conditions.add ({name: punctuationName, indicatorMethod: ConditionIndicatorMethod.USE_HIGHLIGHT, indicatorColor: [150,250,150]});
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;    
    app.findGrepPreferences.findWhat = "(:)(\\S)";
    app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
    var colonRez = sel.changeGrep();  
    for (var c = 0; c < colonRez.length; c++) { colonRez[c].appliedConditions = myCondition; }
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;     
    app.findGrepPreferences.findWhat = "(\\S)(:)";
    app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
    sel.changeGrep(); 
    var colonRez = sel.changeGrep();  
    for (var c = 0; c < colonRez.length; c++) { colonRez[c].appliedConditions = myCondition; } 
    // рядом с двоеточием уже мог быть пробел. Его надо заменить на тот, что определён радиокнопкой.
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;     
    app.findGrepPreferences.findWhat = "(\\h)(:)(\\h)";
    app.changeGrepPreferences.changeTo = usedSpace + "$2" + usedSpace;    
    sel.changeGrep(); 
    var colonRez = sel.changeGrep();  
    for (var c = 0; c < colonRez.length; c++) { colonRez[c].appliedConditions = myCondition; }   
    https1();       
    return;
    } // colon.value
///
if (slash.value) { // slash.value
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "(\/)(\\S)";
    app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
    sel.changeGrep();  
    // повтор на случай, если две черты одна за другой
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;     
    app.findGrepPreferences.findWhat = "(\/)(\\S)";
    app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
    sel.changeGrep();  
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "(\\S)(\/)";
    app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
    sel.changeGrep();   
    ///
    // рядом с наклонной чертой может быть пробел. Его надо заменить на тот, что определён радиокнопкой.
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "(\/)(\\h)";
    app.changeGrepPreferences.changeTo = "/" + usedSpace;
    sel.changeGrep();   
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "(\\h)(\/)";
    app.changeGrepPreferences.changeTo = usedSpace + "/";
    sel.changeGrep();     
    ///
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = usedSpace + "\/"  + usedSpace + "\/" + usedSpace; // между двумя подряд наклонными чертами может оказаться пробел.
    app.changeGrepPreferences.changeTo = usedSpace + "//" + usedSpace; // исправим это.
    sel.changeGrep();  
    https2();   
    ///
    var usedKernValue = Number(inputKern.text);
    if (slashKern.value == false) usedKernValue = 0;
    app.findGrepPreferences = app.changeGrepPreferences = null;  
    app.findChangeGrepOptions.includeFootnotes = true;   
    app.findGrepPreferences.findWhat = "\/\/";
    var kRez = sel.findGrep();  
    if (kRez.length == 0) return;
    for (var i = 0; i < kRez.length; i++) {
        var slIndex = kRez[i].index+1;
        story.insertionPoints[slIndex].kerningValue = Number(usedKernValue);
        }
    return;
    } // slash.value
    ///  
    var theCh = "";
    if (semicolon.value) theCh = ";";
    //  else if (ellipsis.value) theCh = "…";  
    else if (ellipsis.value) theCh = "~e";          
    else if (plus.value) theCh = "\\+";          
    else if (equal.value) theCh = "="; 
    if (theCh.length != 0) { 
        spaceBefore (theCh, usedSpace);
        spaceAfter (theCh, usedSpace);
        return;
        }
    if (comma.value) {
        spaceAfter (",", usedSpace);
        return;
        }
    if (dot.value) {
        spaceAfter ("\\.", usedSpace);
        return;
        }        
    if (parenthesis.value) {
        spaceBefore ("\\(", usedSpace);
        spaceAfter ("\\)", usedSpace);  
        ///
        app.findGrepPreferences = app.changeGrepPreferences = null;  
        app.findChangeGrepOptions.includeFootnotes = true;     
        app.findGrepPreferences.findWhat = "(\\))(\\h)([\\.,])"; 
        app.changeGrepPreferences.changeTo = "$1$3";
        sel.changeGrep();
        ///
        return;            
        }
    if (brackets.value) {
        spaceBefore ("\\[", usedSpace);
        spaceAfter ("\\]", usedSpace);   
        ///
        app.findGrepPreferences = app.changeGrepPreferences = null;  
        app.findChangeGrepOptions.includeFootnotes = true;     
        app.findGrepPreferences.findWhat = "(\\])(\\h)([\\.,])"; 
        app.changeGrepPreferences.changeTo = "$1$3";
        sel.changeGrep();
        ///
        return;            
        }
/// дальше идут функции, использующиеся при обработке выбранных знаков
function spaceAfter (theCh, usedSpace) { // spaceAfter
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "(" + theCh + ")(\\S)"; 
app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
sel.changeGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "(" + theCh + ")(\\h)"; 
app.changeGrepPreferences.changeTo = "$1" + usedSpace;
sel.changeGrep(); 
if (theCh != "\\." && theCh != ",") return;
// пробел между точкой и запятой противоречит правилу этого стандарта в отношении запятой, что добавляется пробел только после запятой. Т.е. до запятой пробела быть не должно
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "(\\.)(\\h)(,)"; 
app.changeGrepPreferences.changeTo = "$1$3";
sel.changeGrep(); 
// если точка разделяет числа, то  после точки не должно быть пробелов
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "(\\d)(\\.)(\\h)(\\d)"; 
app.changeGrepPreferences.changeTo = "$1$2$4";
sel.changeGrep(); 
////
https1();
} // spaceAfter
///
function spaceBefore (theCh, usedSpace) { // spaceBefore    
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;   
app.findGrepPreferences.findWhat = "(\\S)(" + theCh + ")";
app.changeGrepPreferences.changeTo = "$1" + usedSpace + "$2";
sel.changeGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;   
app.findGrepPreferences.findWhat = "(\\h)(" + theCh + ")";
app.changeGrepPreferences.changeTo = usedSpace + "$2";
sel.changeGrep();
 } // spaceBefore    
///
function https1() { // https1
// если двоеточие после http или https и перед ним две наклонные черты, то пробелы не нужны
 app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "([ps])(\\h)(:)(\\h)(\/\/)";
app.changeGrepPreferences.changeTo = "$1$3$5";
sel.changeGrep(); 
// в названии сайта после точки не должно быть пробела.  Тут это решается так: если перед точкой и после пробела идут цифры или латинские буквы, то пробел удаляется.
var lat = ["[a-zA-Z0123456789]"];
 app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "(" + lat + ")(\\.)(\\h)(" + lat + ")";
app.changeGrepPreferences.changeTo = "$1$2$4";
sel.changeGrep(); 
} // https1
///
function https2() { // https2
// если косые линии после http: или https:, то пробелы не нужны
 app.findGrepPreferences = app.changeGrepPreferences = null;  
app.findChangeGrepOptions.includeFootnotes = true;     
app.findGrepPreferences.findWhat = "([ps])(:)(\\h)(\/\/)(\\h)";
app.changeGrepPreferences.changeTo = "$1$2$4";
sel.changeGrep();  
} // https2
///
} // predPunct
} // action.onClick
///
info.onClick = function () { // info.onClick
var textInfo = "Данный скрипт в предварительно обработанном скриптом DoTextOK тексте приводит в порядок знаки предписанной пунктуации. Информация о таких знаках есть в ГОСТ Р 7.0.100-2018, вот выдержка из этого стандарта.\n\n-----\nГОСТ Р 7.0.100-2018.  Пункт 4.6\n4.6 Пунктуация в библиографическом описании выполняет две функции – обычных грамматических знаков препинания и знаков предписанной пунктуации, т. е. знаков, имеющих опознавательный характер для областей и элементов библиографического описания. \nПредписанная пунктуация способствует распознаванию отдельных элементов в описаниях на разных языках в выходных формах традиционной и машиночитаемой каталогизации.\n\n4.6.1 Предписанная пунктуация предшествует элементам и областям описания или заключает их. \nЕе употребление не связано с нормами языка. В качестве предписанной пунктуации выступают знаки препинания и математические знаки: \n. — точка и тире; . точка; , запятая; : двоеточие; ; точка с запятой; … многоточие; / косая черта; // две косые черты; ( ) круглые скобки;\n[ ] квадратные скобки; + знак плюс; = знак равенства. В конце библиографического описания ставят точку.\n\n4.6.5  Для разделения областей и элементов, а также для различения предписанной и грамматической пунктуации применяют пробелы в один печатный знак до и после предписанного знака. \nИсключение составляют знаки «точка» и «запятая», пробелы оставляют только после них.\n\n4.6.6 Скобки (как круглые, так и квадратные) рассматривают как единый знак, предшествующий пробел находится перед первой (открывающей) скобкой, а последующий пробел — после второй (закрывающей) скобки.\n\n4.6.10 Внутри элементов сохраняют пунктуацию, соответствующую нормам языка, на котором составлено описание. Если элемент состоит из нескольких слов или фраз, представляющих законченные предложения, то их приводят с теми знаками препинания, которые указаны в ресурсе.\n\n-----\n\nКаждый знак обрабатывается отдельно, чтобы иметь максимальную гибкость в обработке библиографических данных.\nТекст сносок тоже будет обработан, если их знаки есть в выделенной области.\n\nВид используемого пробела — обычный или неразрывный — определяется установкой «Используемый пробел».\n\n> Косая черта\nЭта радиокнопка для оформления как одной косой черты, так и для случаев, когда их две подряд. Радиокнопки «Используемый пробел» определяют, какой пробел будет рядом с этими косыми чертами. Флажок «Кернинг между линиями» позволяет уменьшить расстояние между стоящими рядом косыми чертами. Вы можете подобрать такой кернинг, при котором пара этих символов визуально смотрится как один полиграфический знак. Взгляните на знак процента: % — три знака ноль-черта-ноль собраны в один знак. Точно также две стоящие рядом косые черты можно изменением кернинга скомпоновать так, что они будут смотреться одним аккуратным знаком.\nЗначение кернинга по умолчанию –250 единиц, оно отображается в поле ввода.\nМожно задать свой вариант, целое число в диапазоне от –50 до –400 единиц.\nЕсли флажок сброшен, то кернинг будет нулевой.\n\n> Тире\nСкрипт DoTextOK ставит шпации до и после тире, может изменить масштаб пробелов. В библиографической записи не нужны ни шпации, ни изменённый масштаб пробелов. В выбранном тексте до и после тире появятся пробелы. Если пробелы были, то слева будет неразрывный изменяемый пробел, справа обычный пробел. Горизонтальный масштаб тире и пробелов будет 100%.\n\n> Двоеточие\nИз всех знаков он, пожалуй, самый проблемный в том плане, что не всегда нужен пробел перед ним. Пункт «4.6.10 Внутри элементов сохраняют пунктуацию, соответствующую нормам языка, на котором составлено описание.» невозможно формализовать. \nПоэтому надо сделать максимально комфортным нахождение обработанных скриптом знаков двоеточия, чтобы принять решение — нужен пробел перед ним или нет. Для этого двоеточие и пробелы оформляются как условный текст. Эти установки не надо выключать в панели «Условный текст», т.к. это уберёт и текст, которым они оформлены. \nПри завершении работы программы использовавшиеся установки условного текста будут удалены.\n\nДля оформления остальных знаков, указанных в упомянутом стандарте, нужно только определить вид используемого пробела.\n\n> Между числами дефис\n Этот флажок определяет, что обработка начнётся с того, что между цифрами будет неразрывный дефис. Это не оговорено в данном стандарте, и тем не менее в библиографических текстах минус между числами не нужен. Достаточно использовать данный флажок один раз в начале работы с библиографическим текстом.\n\n> Убрать пробел между инициалами\nСейчас становится общепринятой практикой убирать пробел между инициалами. Обработка текста этим скриптом может вернуть пробелы между инициалами, и эта опция сделает так, что инициалы будут идти один за другим, без шпаций между ними.\n\n\nПрограмма не ставит пробел:\n- после точки, если точка разделяет числа;\n- до и после двух косых черт, если перед ними http: или https: ;\n- после точки в названии сайта, имя которого написано латинскими буквами.\n\nВо время выполнения задания название запускающей кнопки будет «Обработка», после завершения вернётся «Обработать выделенный текст». Если вы запускаете обработку, но ничего не происходит, то скорее всего, не была выбрана нужная радиокнопка.\nКлавиши Ctrl+Z вернут текст к состоянию, которое было до нажатия кнопки «Обработать выделенный текст». Во время нажатия этих горячих клавиш курсор должен быть в тексте.\n\nКнопка […] для того, чтобы свернуть рабочее окно, оставив программу активной. Вместо большого окна будет кнопка со стороной примерно 60 пикселей. Её можно передвинуть в угол экрана, чтобы не мешала работать с текстом. И когда понадобится, щелчок на этой кнопке распахнёт окно программы.\n\nЭту инструкцию можно выделить и взять в буфер, чтобы распечатать.\n\n\n============\nhttps://dotextok.ru  |  dotextok@gmail.com\n\n\n";
var wn = new Window ("dialog", programTitul);
var data = wn.add("edittext", [0, 0, 850, 550], textInfo, {multiline: true});
wn.layout.layout();
wn.show();
return;
} // info.onClick
///
w.onClose = function() {
try {app.activeDocument.conditions.item(punctuationName).remove(); } catch (e) { }
}
///
hide.onClick = function() { // hide.onClick
w.hide();
var slaveWinLocation = [-1,-1]; // положение на экране служебного окна программы
var wn = new Window ("palette", "~*~", undefined, {closeButton: false});
wn.margins = [1,1,1,1];
var myScriptFile = myGetScriptPath(); 
var myDefSetName  = "SpecPunct.ini"; // это файл установок программы
var myScriptFolder = decodeURI(myScriptFile.path);
var myFilePath = decodeURI(myScriptFolder + "/" + myDefSetName); 
var myDataFile = new File (myFilePath);
if (myDataFile.exists) { //File.exists
    myDataFile.open("r");
    slaveWinLocation[0] = myDataFile.readln();
    slaveWinLocation[1] = myDataFile.readln();
    myDataFile.close();
    } //File.exists
if (slaveWinLocation[0] != -1) wn.location = slaveWinLocation;
var retButton = wn.add("button", [0,0,30,30], "- • -");
retButton.onClick = function() { // retButton.onClick()
    try { w.show(); } catch (e) {exit() };
    myDataFile.open("w");
    myDataFile.writeln(wn.location[0]);
    myDataFile.writeln(wn.location[1]);
    myDataFile.close();
    wn.close();
    } // retButton.onClick()
///
wn.show();
}  // hide.onClick
///
w.show();
///////////////
function myGetScriptPath() { // myGetScriptPath
try{
return app.activeScript;
}
catch(myError) {
return File (myError.fileName);
}
} // myGetScriptPath
