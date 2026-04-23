// LostCharsInStory [Minion Pro].jsx 

/*

Если знак, или как его иначе называют глиф (glyph), отсутствует в выбранном для этого знака шрифте, то на экране на месте знака обычно розовый квадратик.
Скрипт ищет такие потерянные глифы в статье, оформляет их шрифтом, определённым в переменной rightFontName, и отмечает цветом '#colorForGlyphes'.
Предполагается, что в этом шрифте (rightFontName) эти глифы есть.

Обрабатывается вся статья.
Перед поиском проверяется, что доступны все используемые в вёрстке шрифты.

После обработки надо в поиске просмотреть все знаки, отмеченные цветом '#colorForGlyphes', дабы убедиться, что розовых квадратиков больше не осталось,
и приложить к этим знакам символьный стиль, чтобы не потерять это оформление.

В большинстве случаев греческие буквы становятся проблемными глифами.
Скрипт DoTextOK находит эти знаки, оформляет их символьным стилем 'mySpecialChars',
(вкладка "Оформление текста", флажок "Создать символьные стили для специальных знаков и других алфавитов")
но поскольку в установках этого стиля шрифт не определён, то приложение абзацного стиля будет причиной появления розовых квадратиков.

Если в Word текст набирался шрифтом Times New Roman, в него помещались греческие буквы. 
После импорта в индизайне этот текст оформили гарнитурой Лазурского, и все греческие буквы исчезли.
Другая ситуация -- они могут появиться после приведения в порядок сносок скриптом: там тоже есть присвоение предопределенного абзацного стиля. 

Как вариант, сразу после обработки скриптом DoTextOK определять в стиле 'mySpecialChars' используемый шрифт для специальных знаков и других алфавитов, если такой существует для этой задачи.
Тогда стилевая разметка текста не должна влиять на греческие буквы, они в розовые квадратики превратиться не должны.

Но проще после стилевой разметки проверить весь текст этим скриптом, чтобы убедиться, что не появились розовые квадратики.
И если обнаружились, то оформить их символьным стилем, в котором указано название шрифта, чтобы эту разметку дальше не потерять.

https://dotextok.ru

*/

var ProgressBar = function(title) { // ProgressBar
var w = new Window('palette', title, {x:0, y:0, width:740, height:50},{closeButton: true}),
st = w.add('statictext', {x:20, y:10, width:700, height:20}),
pb = w.add('progressbar', {x:20, y:32, width:700, height:12});
st.justify = 'left';
w.center();
this.reset = function(maxValue) {
pb.value = 0;
pb.maxvalue = maxValue;
w.show();
w.update();
}

this.hit = function() {++pb.value; w.update();}
this.hide = function() {w.hide();}
this.close = function() {w.close();}
this.info = function(msg) {
    st.text = msg;
    w.show();
    w.update();
    }
} // ProgressBar


var programTitul = "Обработка потерянных глифов"; 

var rightFontName = "Minion Pro"; // это шрифт для потерянных глифов

var myInfoColorSample = [0, 100, 100, 0]; 
var colorForGlyphes = "#colorForGlyphes";

if (app.documents.length == 0) {
    alert("Нет открытых документов.", programTitul);   
    exit();
    }
if (!app.documents[0].fonts.item(rightFontName).isValid) {
    alert("В системе отсутствует шрифт, указанный в переменной rightFontName:\n" + rightFontName, programTitul);
    exit();       
    }
mySel = app.selection[0];
if (mySel == null || mySel.constructor.name != "InsertionPoint") {
    alert("Курсор должен быть в статье, где ищутся отсутствующие в гарнитуре глифы.", programTitul);
    exit();    
    } 
var doProc = false;
var myStory = mySel.parentStory;
var myFonts = app.documents[0].fonts.everyItem().getElements();
var pBar = new ProgressBar(programTitul + " [ " + rightFontName + " ] ");
pBar.reset( myFonts.length);
pBar.hit();
for (f = 0; f < myFonts.length; f++, pBar.hit()) { // f++
    if (myFonts[f].status != FontStatus.INSTALLED) { //!INSTALLED
        pBar.close();        
        alert("Шрифт " + myFonts[f].name + " на машине отсутствует.\rИнформация об этом есть и в окне 'Текст' > 'Найти шрифт…'.", programTitul);
        exit();   
        } // !INSTALLED;
    var fn = f+1;
    pBar.info(fn + "/" + myFonts.length + " : " + myFonts[f].fontFamily + " . " + myFonts[f].fontStyleName);
    app.findGlyphPreferences = null;    
    app.findGlyphPreferences.glyphID = 0;    
    app.findGlyphPreferences.appliedFont = myFonts[f].fontFamily;
    app.findGlyphPreferences.fontStyle = myFonts[f].fontStyleName; 
   allFound = myStory.findGlyph();  
    if (allFound.length > 0) { // > 0
        var chLine = "";
        for (i = 0; i < allFound.length; i++) { // i++
            chLine += allFound[i].contents + ", ";
            } // i++
        var mess = "При использовании шрифта '" + myFonts[f].fontFamily + " " +  myFonts[f].fontStyleName + "' в статье проблемные глифы: " + chLine;
        var procTheseChars = prompt (mess, "Изменить их шрифт в этой статье на " + rightFontName + " ?", programTitul);
        if (procTheseChars == null) {
            pBar.close();
            alert("Обработка прервана.", programTitul);
            exit();
            }   
        try{
            myColor = app.activeDocument.colors.item(colorForGlyphes);
            myName = myColor.name;
            }  
        catch (e) { 
            myColor = app.activeDocument.colors.add ({name:colorForGlyphes, model:ColorModel.process, space:ColorSpace.CMYK,  colorValue:myInfoColorSample});
            }     
        doProc = true;
        for (var i = 0; i < allFound.length; i++) { //  i < allFound.length
            allFound[i].appliedFont = app.documents[0].fonts.item(rightFontName);
            allFound[i].fillColor = colorForGlyphes;
                } //  i < allFound.length       
        }  // > 0
    } // f++
pBar.close();
if (doProc) alert("Найденные проблемные символы оформлены шрифтом '" + rightFontName + "' и окрашены цветом '" + colorForGlyphes + "'.\r\rИмеет смысл сделать символьный стиль для их оформления, затем найти все знаки, окрашенные цветом '" + colorForGlyphes + "', и приложить к ним созданный символьный стиль, чтобы на их месте не было розовых квадратиков потерянных глифов.", programTitul);
else alert("Ничего не найдено.", programTitul);
exit();

