// DeleteUnusedCharacterStyles.jsx

/*
   
    Скрипт удаляет все неиспользуемые в работе символьные стили, включая группы, в которых ничего нет.
    При этом можно запретить удалять стили: будут оставлены те, имя которых начинается с знака/знаков, 
    помещенных в массив specChar, по умолчанию это ["#", "my", "_"].
    Символьные стили не удаляются, если их название начинается с знака/знаков из specChar.
    
    После удаления неиспользуемых символьных стилей в статье, где стоит курсор, снимается локальное форматирование текста.
    
    Скрипт должен запускаться только после отработки текста программой DoTextOK, 
    поскольку запуск его до DoTextOK может привести к потере оформления -- исчезновению курсива и полужирного начертаний, подчёркивания, индексов.
    
    © Михаил Иванюшин, 2020  |  dotextok.ru  |  dotextok@gmail.com

*/

var specChar = ["#", "my", "_"]; // стили, начинающиеся с этого символа или символов, не удаляются
var programTitul = "Удаление ненужных символьных стилей";
var ProgressBar = function(title) { // ProgressBar
var w = new Window('palette', title, {x:0, y:0, width:740, height:65},{closeButton: true}),
pb = w.add('progressbar', {x:20, y:37, width:700, height:12}),
st = w.add('statictext', {x:20, y:12, width:700, height:20});
st.justify = 'left';
w.center();
this.reset = function(msg,maxValue) {
    st.text = msg;
    pb.value = 0; 
    pb.maxvalue = maxValue;
    w.show();
    w.update();
    };
this.set = function(value) {
    pb.value = value;
    w.show();
    w.update();
    };
this.hit = function() {++pb.value; w.update();};
this.hide = function() {w.hide();};
this.close = function() {w.close();};
this.info = function(msg) {
    st.text = msg;
    w.show();
    w.update();
    };
} // ProgressBar
/////////////////////////////

var parseIntAppVersion = parseInt (app.version); 
if (parseIntAppVersion < 6) {
	alert ("Этот скрипт предназначен для использования в InDesign CS4+.", programTitul);
    exit();
    }
if (app.documents.length == 0) {
    alert("Нет открытых документов.",programTitul);   
    exit();
    }

var mySel = app.selection[0];
if ((mySel == null) || (mySel.constructor.name != "InsertionPoint")) {
    alert("Курсор должен быть в тексте статьи.", programTitul);	
    exit();     
    }
var story = mySel.parentStory;
var myDoc = app.activeDocument; 
var myCharStyles = getCharacterStyleNames();

var pBar = new ProgressBar(programTitul);
pBar.reset("", myCharStyles.length);
for (i = myCharStyles.length-1; i >= 1; i-- , pBar.hit()) { 
    // >= 1 - чтобы сохранить служебный стиль [Без стиля]
    removeUnusedCharStyle(myCharStyles[i]); 
    } 
//
pBar.info("Снятие локального форматирования после удаления ненужных символьных стилей");
clearOverrideInStory (story);
pBar.close();
exit();
////
/////////////////
function removeUnusedCharStyle(myChStyle) { // removeUnusedCharStyle
app.findTextPreferences = app.changeTextPreferences = null;
var the_cStyle = myChStyle;  
var nameParts_ = [];
var charStyle = "";
var csGroup = "";
while (nameParts_.length > 0) nameParts_.shift();
nameParts_ = the_cStyle.split(":");
if (testName(nameParts_[nameParts_.length-1], specChar) == null) return; // стили, имя которых начинается с содержимого specChar, не удаляются
if (nameParts_.length == 1) charStyle = myDoc.characterStyles.item(nameParts_[0]); // стиль первого уровня
else if (nameParts_.length == 2) { // == 2
    charStyle = myDoc.characterStyleGroups.item(nameParts_[0]).characterStyles.item(nameParts_[1]); // стиль из группы
    csGroup = myDoc.characterStyleGroups.item(nameParts_[0]);
    } // == 2
else if (nameParts_.length == 3) { // == 3
    charStyle = myDoc.characterStyleGroups.item(nameParts_[0]).characterStyleGroups.item(nameParts_[1]).characterStyles.item(nameParts_[2]); // стиль из группы в группе
    csGroup = myDoc.characterStyleGroups.item(nameParts_[0]).characterStyleGroups.item(nameParts_[1]);
    } // == 3
else if (nameParts_.length == 4) { // == 4
    charStyle = myDoc.characterStyleGroups.item(nameParts_[0]).characterStyleGroups.item(nameParts_[1]).characterStyleGroups.item(nameParts_[2]).characterStyles.item(nameParts_[3]); // стиль из тройной группы
    csGroup = myDoc.characterStyleGroups.item(nameParts_[0]).characterStyleGroups.item(nameParts_[1]).characterStyleGroups.item(nameParts_[2]);
    } // == 4
else {
    alert(myChStyle + " — такой уровень вложения групп символьных стилей не поддерживается."); 
    exit();
    }           
charStyle.remove(); 
if ((String(csGroup).length != 0) && (csGroup.allCharacterStyles.length == 0)) { // &&
    if (csGroup.characterStyleGroups.length == 0) csGroup.remove();
    else { /// else
        var csum = 0;
        for (c = 0; c < csGroup.characterStyleGroups.length; c++) { // c++
            csum += csGroup.characterStyleGroups[c].allCharacterStyles.length;
            } // c++
        if (csum == 0) csGroup.remove(); // csum == 0 -- это критерий, что в этих группах нет стилей
        } /// else
    } // &&
} // removeUnusedCharStyle
//////////////////////////////////////////////////////////////////////
function getCharacterStyleNames() { // getCharacterStyleNames
var _result = [];    
var myCharacterStyles = myDoc.allCharacterStyles;
var myCharacterStyleName, obj;
for (i = 0; i < myCharacterStyles.length ; i++) { // for
    myCharacterStyleName = myCharacterStyles[i].name;
    obj = myCharacterStyles[i];
    while(obj.parent instanceof CharacterStyleGroup) {
        myCharacterStyleName = obj.parent.name + ":" + myCharacterStyleName;
        obj = obj.parent;        
        }
    _result.push(myCharacterStyleName);
    } // for
//_result.shift(); // удаление стиля No Character Style
return _result;
} // getCharacterStyleNames
//////////////
function testName (name, arr) { // testName
var arL = arr.length;
for (ii = 0; ii < arL; ii++) { // ii++
    var item = arr[ii];
    var sample = [];
    while (sample.length > 0) sample.shift();
    for (j = 0; j < item.length; j++) { sample.push(item[j]); };
    var sampleLine = "";
    sampleLine = sample.join("");
///
    var partOfName = [];
    while (partOfName.length > 0) partOfName.shift();
    for (j = 0; j < item.length; j++) { partOfName.push(name[j]); };
    var partOfNameLine = "";
    partOfNameLine = partOfName.join("");
    if (partOfNameLine == sampleLine) return null; // есть совпадение
    } // ii++
return 0;
} // testName
//////
function clearOverrideInStory (story) { // clearOverrideInStory
story.clearOverrides(OverrideType.ALL);
try{ story.footnotes.everyItem().texts.everyItem().clearOverrides(OverrideType.ALL); } catch (e) { };
try{ story.tables.everyItem().cells.everyItem().paragraphs.everyItem().clearOverrides(OverrideType.ALL); } catch (e) { };
} // clearOverrideInStory 

