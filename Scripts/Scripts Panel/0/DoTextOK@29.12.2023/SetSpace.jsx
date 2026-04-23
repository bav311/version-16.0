// SetSpace.jsx

/*
    
https://forum.rudtp.ru/threads/universalno-pravilo-dlja-sokraschenija-g.80042/#post-1337727    
тут обсуждение, как правильно указать неразрывный пробел в случаях использования сокращения 'г.'.
Проблема в том, что невозможно идентифицировать, когда 'г.' — это сокращение слова 'год', а когда 'город',
Вот обсуждавшиеся проблемные примеры:
----
> В 2022 г. Москва похорошела как никогда.
> Гостей 200 г. Урюпинск готов принять в свой день рождения в этот раз.
> школа № 1231 г. Города.
> После случайного выброса в атмосферу изотопов урана-236 г. Кладбищенск действительно превратился в безлюдную территорию.
----

Если это действительно проблема, то проще в выделенном тексте просмотреть все такие случаи и по каждому принять решение.
Быстро это сделать поможет данный скрипт: сначала надо выделить текст, а потом запустить программу.
В выделенном тексте ищется: <цифра><шпация><г.><шпация><прописная буква>.
Первый найденный образец выделяется и помещается в центр экрана.
В правом верхнем углу окна скрипта отображается информация
[ номер текущего выбранного образца / общее число найденных образцов ]

Кнопки [ < ] и [ > ] для перехода к другому образцу без изменения выбранного.
При достижении первого или последнего образца кнопка становится недоступна.
Кнопка [ Изменить ] — оформляются пробелы до и после сокращения 'г.', после этого выбирается следующий образец.
Варианты пробелов до и после сокращения 'г.':
О — обычный, Н — неразрывный изменяемый.

-----------------------------
https://dotextok.ru   2023

*/

#targetengine "SetSpace"

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; // см. http://adobeindesign.ru/2008/10/24/restore-ui/

var programTitul = "Года и Города";
////////
if(app.documents.length == 0) {
alert("Нет открытого документа.", programTitul);	
exit();    
}
var sel = app.selection[0];
if (sel == null || (sel.constructor.name != "Paragraph" && sel.constructor.name != "Text" && sel.constructor.name != "TextColumn" && sel.constructor.name != "TextStyleRange")) { // == null
    alert("Перед запуском скрипта должен быть выделен текст.",programTitul);
    exit();    
    } // == nul
var fs = "\u00A0"; // изменяемый неразрывный пробел
var cs = " "; // обычный пробел
var scale = 150;

app.findGrepPreferences = app.changeGrepPreferences = null; 
app.findGrepPreferences.findWhat = "(\\d)(\\h)(г\\.)(\\h)(\\u)";
var rez = sel.findGrep();
if (rez.length == 0) {
    alert("Ничего не найдено", programTitul);
    exit();
    }
////
var startPage = rez[0].parentTextFrames[0].parentPage;
rez[0].select();
app.activeWindow.activePage = startPage;
app.activeWindow.zoomPercentage = scale;
var foundNum = rez.length;
var index = 0;
var w = new Window ("palette",programTitul);
infoLine = w.add("statictext", undefined);
var digit_spaces_Upper = "цифра <?> г. <?> Город";
var state = "   [ 1/" + foundNum + " ]";
infoLine.text = digit_spaces_Upper + state;
separator0 = w.add ("panel");
separator0.minimumSize.height = separator0.maximumSize.height = 1;
separator0.alignment = ["fill", "fill"];
var cc = w.add("radiobutton", undefined,"О О");
var fc = w.add("radiobutton", undefined,"Н О");
fc.value = true;
var cf = w.add("radiobutton", undefined,"О Н");
var ff = w.add("radiobutton", undefined,"H Н");
separator1 = w.add ("panel");
separator1.minimumSize.height = separator0.maximumSize.heigh1 = 1;
separator1.alignment = ["fill", "fill"];
var buttons = w.add("group");
buttons.orientation = "row";
var info = buttons.add("button", [0,0,28,28], "?");
var back =  buttons.add("button", [0,0,28,28], "<");
var action = buttons.add("button", [0,0,120,28], "Изменить");
var next =  buttons.add("button", [0,0,28,28], ">");
///
back.onClick = function() { // back.onClick
selBack();
} // back.onClick
///
next.onClick = function() { // next.onClick
selNext();
} // next.onClick
///
function selBack() { // selBack()
if (index == 0) {
    back.enabled = false;
    return;
    }
back.enabled = true;
next.enabled = true;
index = index-1;
showItem(index);
} // selBack()
///
function selNext() { // selNext()
if (index == foundNum-1) {
    next.enabled = false;    
    return;
    }
next.enabled = true;
back.enabled = true;
index = index+1;
showItem(index);
} // selNext()
///
function showItem(index) { // showItem()
var indx = index;    
rez[indx].select();
startPage = rez[indx].parentTextFrames[0].parentPage;
app.activeWindow.activePage = startPage;
app.activeWindow.zoomPercentage = scale;
indx = indx+1; // теперь indx не индекс найденного образца, а его порядковый номер.
state = "   [ " + indx + "/" + foundNum + " ]";
infoLine.text = digit_spaces_Upper + state;
} // showItem()
///
action.onClick = function() { // action.onClick
if (cc.value) { // cc
    rez[index].characters[1].contents = cs;
    rez[index].characters[4].contents = cs;    
    } // cc
else if (cf.value) { // cf
    rez[index].characters[1].contents = cs;
    rez[index].characters[4].contents = fs;    
    } // cf    
else if (fc.value) { // fc
    rez[index].characters[1].contents = fs;
    rez[index].characters[4].contents = cs;    
    } // fc   
else if (ff.value) { // ff
    rez[index].characters[1].contents = fs;
    rez[index].characters[4].contents = fs;    
    } // ff
selNext();
} // action.onClick
///
info.onClick = function() {
var infoText = "https://forum.rudtp.ru/threads/universalno-pravilo-dlja-sokraschenija-g.80042/#post-1337727    \nтут обсуждение, как правильно указать неразрывный пробел в случаях использования сокращения 'г.'.\nПроблема в том, что невозможно идентифицировать, когда 'г.' — это сокращение слова 'год', а когда 'город',\nВот обсуждавшиеся проблемные примеры:\n----\n> В 2022 г. Москва похорошела как никогда.\n> Гостей 200 г. Урюпинск готов принять в свой день рождения в этот раз.\n> школа № 1231 г. Города.\n> После случайного выброса в атмосферу изотопов урана-236 г. Кладбищенск действительно превратился в безлюдную территорию.\n----\n\nЕсли это действительно проблема, то проще в выделенном тексте просмотреть все такие случаи и по каждому принять решение.\nБыстро это сделать поможет данный скрипт: сначала надо выделить текст, а потом запустить программу.\nВ выделенном тексте ищется: <цифра><шпация><г.><шпация><прописная буква>.\nПервый найденный образец выделяется и помещается в центр экрана.\nВ правом верхнем углу окна скрипта отображается информация\n[ номер текущего выбранного образца / общее число найденных образцов ]\n\nКнопки [ < ] и [ > ] для перехода к другому образцу без изменения выбранного.\nПри достижении первого или последнего образца кнопка становится недоступна.\nКнопка [ Изменить ] — оформляются пробелы до и после сокращения 'г.', после этого выбирается следующий образец.\nВарианты пробелов до и после сокращения 'г.':\nО — обычный, Н — неразрывный изменяемый.\n\n-----------------------------\nhttps://dotextok.ru   2023\n";   
alert(infoText, programTitul);    
}    
///
w.show();

