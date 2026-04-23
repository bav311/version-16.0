// SpaceOfPictures.jsx
// Подсчет площади рисунков в документе.
// Обрабатываются фреймы с рисунками и привязанные к тексту иллюстрации.
// Рисунки с одинаковыми именами учитываются один раз за исключением тех, что вставлены через буфер.
// Эти объекты не появляются в программе LINKS и учитываются всякий раз при появлении их в вёрстке.
// Пользователь должен удалить все неиспользуемые объекты с монтажного стола, 
// т.к. не задействовано определение, где размещен рисунок -- на полосе или за её пределами.
// Программа также не учитывает возможное наличие атрибута "Nonprinting" у некоторых фреймов или групп.
// 
// InDesign CS3, InDsign CS4
// © Михаил Иванюшин, 2010.   ivanyushin#yandex.ru

var myCurrentVersionData_xx_xx_xx = "03.04.2010";
var myProgramTitul = "  Подсчет площади рисунков в документе (" + myCurrentVersionData_xx_xx_xx + ")  ";
var mySpaceOfPictures = 0; // площадь рисунков в документе, кв. см
var myFrName; // имя текущего фрейма документа
var myCurrPictFrame; // ссылка на текущий нетекстовый фрейм
var myCurrGroup; // ссылка на текущую группу
var myCurrGraph; // ссылка на текущий рисунок
var myCurrPictName; // имя этого рисунка
var myNamesOfAllPictures = new Array;
var myPictureWidth;
var myPictureHeight;
var myNumberOfPictures = 0;
var myObjParent;
///
var myProgressbarShow = false;
var myProgresspanel;
var myObjTextFrame;
///
myUnitIsCentimeters = 2053336435;
///
if (app.documents.length != 0) { // doc
var myDoc = app.documents[0];
var myCurrentHorUnits = myDoc.viewPreferences.horizontalMeasurementUnits;
var myCurrentVertUnits = myDoc.viewPreferences.verticalMeasurementUnits;
myDoc.viewPreferences.horizontalMeasurementUnits = myUnitIsCentimeters;
myDoc.viewPreferences.verticalMeasurementUnits = myUnitIsCentimeters;
myProgressPanel = myCreateProgressPanel(myDoc.allPageItems.length, myProgramTitul + "                                                                      http://adobeindesign.ru"); // параметром прогресс-бара будет число графических объектов в тексте
for (i = 0; i < myDoc.allPageItems.length; i++) { // for-i
	myStepByStep(myProgressPanel,i);	
	myFrName = myDoc.allPageItems[i].constructor.name;
	if (myFrName == 'Group') { // Group
		// В массив allPageItems[ ] входят как отдельные фреймы, так и их группы.
		// Поскольку в этом цикле будет обращение к каждому элементу, группы пропускаем.
		continue;
		} // Group
	if (((myFrName == 'Rectangle' || myFrName == 'Oval' || myFrName == 'Polygon')) && (myDoc.allPageItems[i].allGraphics.length != 0))  { // PictFrame with Image
		myCurrPictFrame = myDoc.allPageItems[i];
		myObjParent = myCurrPictFrame.parent;
		mySpaceCalculation();
		continue;
	} // PictFrame with Image
} // for-i
if (myProgressbarShow == true)  myProgressPanel.hide();
alert ("Площадь рисунков " + mySpaceOfPictures.toFixed(2)  + " кв.см,\nчисло рисунков " + myNumberOfPictures+".\n\nhttp://adobeindesign.ru\n\n",myProgramTitul);
myDoc.viewPreferences.horizontalMeasurementUnits = myCurrentHorUnits;
myDoc.viewPreferences.verticalMeasurementUnits = myCurrentVertUnits;
exit();
} // doc
else{
   alert ("Нет открытых документов.",myProgramTitul);
	exit();	   
}
/////
function mySpaceCalculation() {
try { myCurrPictName = myCurrPictFrame.allGraphics[0].itemLink.name; } // в ряде случаев при вставке объектов через буфер они не появляются в панели Links. 
catch (e) { myCurrPictName = null; } 	// поэтому будут учтены без контроля их повторного появления.	
if ( myLookingForCurrPictNameInArray(myCurrPictName) ==true ) return; // если иллюстрация с этим именем уже встречалась, она больше не учитывается	
myPictureWidth= myCurrPictFrame.geometricBounds[3] - myCurrPictFrame.geometricBounds[1];
myPictureHeight= myCurrPictFrame.geometricBounds[2] - myCurrPictFrame.geometricBounds[0];
mySpaceOfPictures += myPictureWidth*myPictureHeight;
myNumberOfPictures++;
return;
}
/////
function myLookingForCurrPictNameInArray(myCurrPictName) {
var myP = 0;
if (myCurrPictName == null) return(false); // если рисунок вставлен через буфер, и его нет в панели Links, он учитывается столько раз, сколько было таких вставок
for (j =0; j < myNamesOfAllPictures.length; j++) { //
	if (myNamesOfAllPictures[j] == myCurrPictName) { myP = 1; break; }
	}
if (myP == 1) return (true);
myNamesOfAllPictures.push(myCurrPictName);
return(false);
}
/////
function myCreateProgressPanel(myMaximumValue,myInfoProgressLine) { 
var myProgressPanel = new Window('window', myInfoProgressLine);
	with(myProgressPanel){
		myProgressPanel.myProgressBar = add('progressbar', [12, 12, 900, 24], 0, myMaximumValue);
		myProgressPanel.show();
		myProgressbarShow = true;
		}
return myProgressPanel;
} 
////
function myStepByStep(myProgressPanel,myProgressIndex) { 
//if 	(myProgressIndex%15 !=0) return;
myProgressPanel.myProgressBar.value = myProgressIndex; 
return;
} 
///