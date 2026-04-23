/*==========================
InDesign ExtendScript
NAME:  TextCleanUp.jsx
VERSION: 1.0

AUTHOR: Evgeny 'jvk' Karev
DATE: 18.03.2008

DESCRIPTION: "Чистка" текста. Нормализация предлогов, пробелов, трие и т.д.

E-MAIL: karev_e@mail.ru, jvk_work@mail.ru
==========================*/

ver = app.version.split('.')
with(app){
var ScriptName = app.activeScript.name.substr(0, app.activeScript.name.length - 4);
var ScriptVersion = "2.0";
var myIniFile = new File (app.activeScript.path + "/" + ScriptName + ".ini");
	if (!myIniFile.exists) {
		alert ("Cant open ini file!"); exit()}
		eval ("//@include 'TextCleanUp.ini'");
if (documents.length < 1) {
alert(langNoDoc);1699963733
exit();}
myDoc = activeDocument
if (selection.length != 1){alert (langSelFrame);exit()}
if (selection[0] !="[object TextFrame]" &&  selection[0].parent != "[object Story]"){alert (langSelFrame);exit()}
//Диалог
myDlg = dialogs.add({name:"textCleanUP v"+ ScriptVersion})
with(myDlg){
	with (dialogColumns.add()){
		with (borderPanels.add()){
			with (dialogColumns.add()){
			dialogRows.add().staticTexts.add({staticLabel:langNorm,checkedState:true,minWidth:0})
			var mySpace = dialogRows.add().checkboxControls.add({staticLabel:langSpace,checkedState:inimySpace});
			var myPara = dialogRows.add().checkboxControls.add({staticLabel:langPara,checkedState:inimyPara});
			var myFLB = dialogRows.add().checkboxControls.add({staticLabel:langFLB,checkedState:inimyFLB});
			var myWEB = dialogRows.add().checkboxControls.add({staticLabel:langWEB,checkedState:inimyWEB});
			var myDigitDash = dialogRows.add().checkboxControls.add({staticLabel:langDigitDash,checkedState:iniDigitDash})
            
            with (borderPanels.add()){
			with (dialogColumns.add()){
                
                dialogRows.add().staticTexts.add({staticLabel:langTab})
			var myTab = radiobuttonGroups.add();
				with (myTab) {
				radiobuttonControls.add({staticLabel:langNone,minWidth:0});
				radiobuttonControls.add({staticLabel:langFTab});
				radiobuttonControls.add({staticLabel:langAllTab});
				myTab.selectedButton = inimyTab}}}

            with (dialogColumns.add()){
			dialogRows.add().staticTexts.add({staticLabel:' ',checkedState:true,minWidth:0})
			var myQuot = dialogRows.add().checkboxControls.add({staticLabel:langQuot,checkedState:inimyQuot});
			var myPre = dialogRows.add().checkboxControls.add({staticLabel:langPre,checkedState:inimyPre});
			var myDeg = dialogRows.add().checkboxControls.add({staticLabel:langDeg,checkedState:inimyDeg});
			var myDH = dialogRows.add().checkboxControls.add({staticLabel:langDH,checkedState:inimyDH});
                                       dialogRows.add().staticTexts.add()

                with (borderPanels.add()){
			with (dialogColumns.add()){

                dialogRows.add().staticTexts.add({staticLabel:langDash})
			var myDash = radiobuttonGroups.add();
				with (myDash) {
				radiobuttonControls.add({staticLabel:langNone,minWidth:0});
				radiobuttonControls.add({staticLabel:langEnD});
				radiobuttonControls.add({staticLabel:langEmD});
				myDash.selectedButton = inimyDash}}}}}}         
                
                with(dialogRows.add()){staticTexts.add({staticLabel:"\u00A9 jvk • 2008-2010 | karev_e@mail.ru",minWidth:0})}}}
result = myDlg.show();if (result == false){myDlg.destroy();exit()}
//==========================
switch(myDash.selectedButton){
	case 1: myDash = "~S~="
		break;
	case 2: myDash = "~S~_"
		break;}
mySel = selection[0].parentStory
// InDesign CS3
//if (ver[0]=='5'){
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
//Forcelinebreak

if (myFLB.checkedState == true){
findTextPreferences.findWhat = "^n";
changeTextPreferences.changeTo = inimyFLBreak
mySel.changeText()}
//==========================
//FirstTab
if(myTab.selectedButton==1){
app.findGrepPreferences.findWhat = "^\\t+";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep();}
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;

if(myTab.selectedButton==2){
app.findGrepPreferences.findWhat = "\\t+";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep();}
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
//==========================



//Space

if (mySpace.checkedState == true){
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "[~m~>~f~|~S~s~<~/~.~3~4~% ]{1,}";
app.changeGrepPreferences.changeTo = "\\s"
mySel.changeGrep();
app.findGrepPreferences.findWhat = "^([~m~>~f~|~S~s~<~/~.~3~4~% ]{1,})";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep();}
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
//==========================
//Paragraph


if (myPara.checkedState == true){
app.findGrepPreferences.findWhat = "^~b+";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep();
//last paragraph
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "\\s+$";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep();
app.findTextPreferences = NothingEnum.nothing;app.changeTextPreferences = NothingEnum.nothing;}
//==========================
//Quotation

if(myQuot.checkedState){
app.findGrepPreferences.findWhat = '"';
app.changeGrepPreferences.changeTo = '~}'
mySel.changeGrep()	
app.findGrepPreferences.findWhat = '~}\\<';
app.changeGrepPreferences.changeTo = '~{'
mySel.changeGrep()
app.findGrepPreferences.findWhat = '(?<=([\\s\\(]))~}';
app.changeGrepPreferences.changeTo = '~{'
mySel.changeGrep()
app.findGrepPreferences.findWhat = '^"';
app.changeGrepPreferences.changeTo = '~{'
mySel.changeGrep()

app.findGrepPreferences.findWhat = '(\\s)(")';
app.changeGrepPreferences.changeTo = '$1~{'
mySel.changeGrep()
app.findGrepPreferences.findWhat = '(\\s)(~{) ';
app.changeGrepPreferences.changeTo = '$1$2'
mySel.changeGrep()

}

	
/*	
app.findGrepPreferences.findWhat = '«\\s|«|“\\s|“';
app.changeGrepPreferences.changeTo = "~{"
mySel.changeGrep()
app.findGrepPreferences.findWhat = '\\s»|»|\\s”|”';
app.changeGrepPreferences.changeTo = "~}"
mySel.changeGrep()}*/
app.findTextPreferences = NothingEnum.nothing;app.changeTextPreferences = NothingEnum.nothing;
//==========================
//Prenext

if (myPre.checkedState){
app.findGrepPreferences.findWhat = '(?i)(\\s)'+iniPretext+'(\\s)'
app.changeGrepPreferences.changeTo = "$1$2~S"
mySel.changeGrep()}
app.findTextPreferences = NothingEnum.nothing;app.changeTextPreferences = NothingEnum.nothing;
//==========================
//Dashes
if (myDash.selectedButton!=0){
app.findGrepPreferences.findWhat = '([~m~>~f~|~S~s~<~/~.~3~4~% ]{1,})(-|~_|~=)'
app.changeGrepPreferences.changeTo = myDash
mySel.changeGrep()
app.findGrepPreferences.findWhat = '(^)(-|~=)'
app.changeGrepPreferences.changeTo = '~='
mySel.changeGrep()}


app.findTextPreferences = NothingEnum.nothing;app.changeTextPreferences = NothingEnum.nothing;
//==========================
//digitDash
if (myDigitDash.checkedState){
app.findGrepPreferences.findWhat = '(\\d)(-|~_|~=)(\\d)'
app.changeGrepPreferences.changeTo = '$1'+iniSelectDigitDash+'$3'
mySel.changeGrep()
app.findTextPreferences = NothingEnum.nothing;app.changeTextPreferences = NothingEnum.nothing;}

//percent

app.changeGrepPreferences.noBreak = true
app.findGrepPreferences.findWhat = "\\(*(\\d+)\\)*(\\s)*(\\%)+";
app.changeGrepPreferences.changeTo = "$1~<$3"
mySel.changeGrep()
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
//==========================

//WEB
if(myWEB.checkedState){
app.findGrepPreferences.findWhat = "(?i)(http|ftp|www)(\\S+)(\\.[A-z]{2,4})";
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.noBreak = true
mySel.changeGrep();
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "[\\w-]+(?:\\.[\\w-]+)*@(?:[\\w-]+\\.)+[A-z]{2,7}";
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.noBreak = true
mySel.changeGrep()}
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
//==========================
//Discretionary Hypen
if(myDH.checkedState){
app.findGrepPreferences.findWhat = "~-";
app.changeGrepPreferences.changeTo = ""
mySel.changeGrep()}
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
//==========================
//Dots
if(myDeg.checkedState){
app.findGrepPreferences.findWhat = "(?<=м|m)\\d(?=\\>)";
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.position = 1936749411
mySel.changeGrep()}
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
/*/==========================
//Fractions
app.findGrepPreferences.findWhat ="\\d+?/"
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.position = 1936749411
mySel.changeGrep()
app.findGrepPreferences.findWhat ="/\\d+?"
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.position = 1935831907
mySel.changeGrep()
app.findGrepPreferences.findWhat ="/"
app.changeGrepPreferences.changeTo = "$0"
app.changeGrepPreferences.position = 1852797549
mySel.changeGrep()
app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;*/
//==========================
//Dots
myDotRep = new Array("^e","^e","^e",".",".","^e",",","!","?",":",";")
myDotFnd = new Array("...","^w^e","^e.","..","^w.","^e.","^w,","^w?","^w:","^w;")
for (a=0;a<myDotFnd.length;a++){
findTextPreferences.findWhat = myDotFnd[a];
changeTextPreferences.changeTo = myDotRep[a]
mySel.changeText()}
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;}
alert (langDone)