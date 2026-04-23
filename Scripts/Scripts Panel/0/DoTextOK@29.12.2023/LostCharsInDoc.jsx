// LostCharsInDoc.jsx

var rightFontName = "Minion Pro"; // это шрифт для потерянных глифов

var myInfoColorSample = [0, 100, 100, 0]; 

if (app.documents.length == 0) { // == 0
    alert("Нет открытых документов.", "Обработка потерянных глифов");  
    exit();
    } // == 0
if (!app.documents[0].fonts.item(rightFontName).isValid) {
    alert("В системе отсутствует шрифт, указанный в переменной rightFontName.", "Обработка потерянных глифов");
    exit();       
    }
var myFonts = app.documents[0].fonts.everyItem().getElements();
for (f = 0; f < myFonts.length; f++) { // f++
    if (myFonts[f].status != FontStatus.INSTALLED) { //!INSTALLED
        alert("Шрифт " + myFonts[f].name + " на машине отсутствует.\rИнформация о этом есть и в окне 'Текст' > 'Найти шрифт…'.", "Обработка потерянных глифов");
        exit();   
        } // !INSTALLED
    app.findGlyphPreferences = null;    
    app.findGlyphPreferences.glyphID = 0;    
    app.findGlyphPreferences.appliedFont = myFonts[f].fontFamily;
    app.findGlyphPreferences.fontStyle = myFonts[f].fontStyleName; 
    allFound = app.documents[0].findGlyph();     
    if (allFound.length > 0) { // > 0
        var chLine = "";
        for (i = 0; i < allFound.length; i++) { // i++
            chLine += allFound[i].contents + ", ";
            } // i++
        var mess = "При использовании шрифта '" + myFonts[f].fontFamily + " " +  myFonts[f].fontStyleName + "' в документе могут быть проблемные глифы: " + chLine;
        var procTheseChars = prompt (mess, "Изменить их шрифт на " + rightFontName + "?", "Обработка потерянных глифов");
        if (procTheseChars == null) continue;
        try{
            myColor = app.activeDocument.colors.item("myInfoColor");
            myName = myColor.name;
            }  
        catch (e) { 
            myColor = app.activeDocument.colors.add ({name:"myInfoColor", model:ColorModel.process, space:ColorSpace.CMYK,  colorValue:myInfoColorSample});
            }        
        for (var i = 0; i < allFound.length; i++) { //  i < allFound.length
            allFound[i].appliedFont = app.documents[0].fonts.item(rightFontName);
            allFound[i].fillColor = "myInfoColor";
                } //  i < allFound.length       
        }  // > 0
    } // f++
alert("Готово!\rОбработанные символы окрашены цветом 'myInfoColor'.", "Обработка потерянных глифов");



