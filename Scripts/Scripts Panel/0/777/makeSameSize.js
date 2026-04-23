/* =========================================================================

NAME: makeSameSize.js

AUTHOR: Oleg Butrin (obutrin@indesign.rudtp.ru)
HOMEPAGE: http://indesign.rudtp.ru
DATE  : 17.06.2004 11:32

COMMENT:
Script resize selected object to size of etalon object 

RIGHT:
You have the right to use and distribute this script.
You have the right to modify this script for own needs. 
It is desirable to send the variant to the author of a script.
You have no right to distribute the modified script from author's name.
You have no right to have profit from sale of a script.

The author of a script does not sustain the responsibility in all cases of loss data and other kinds of losses if they have arisen in the time of using a script.
You use this script at your own fear and risk.

============================================================================ */
function getPercent(myEtalon, myNum) {
	return myEtalon * 100 / myNum;
}

function getMinValue (myArray) {
	if (myArray.constructor.name != "Array") {
		return null;
		exit;
	}
	var myMin = myArray[0];
	for (myCounter = 0; myCounter < myArray.length; myCounter++) {
		myMin = Math.min(myMin, myArray[myCounter]);
	}
	return myMin;
}

function getMaxValue (myArray) {
	if (myArray.constructor.name != "Array") {
		return null;
		exit;
	}
	var myMax = myArray[0];
	for (myCounter = 0; myCounter < myArray.length; myCounter++) {
		myMax = Math.max(myMax, myArray[myCounter]);
	}
	return myMax;
}

function resizeObject (myObject, myWidth, myHeight, myEtalonWidth, myEtalonHeight, myRWidth, myRHeight, myRContent, myCStroke) {
	if (myRContent) {
		if (myRWidth) {
			var myWidthPercent = getPercent(myEtalonWidth, myWidth);
		} else {
			var myWidthPercent = 100;
		}
		if (myRHeight) {
			var myHeightPercent = getPercent(myEtalonHeight, myHeight);
		} else {
			var myHeightPercent = 100;
		}
		myObject.resize (myWidthPercent, myHeightPercent, AnchorPoint.topLeftAnchor, true, myRContent, false);
	} else {
		if (myCStroke) {
			var myBounds = myObject.visibleBounds;
			if (myRWidth) {
				myBounds[3] = myBounds[1] + myEtalonWidth;
			}
			if (myRHeight) {
				myBounds[2] = myBounds[0] + myEtalonHeight;
			}
			myObject.visibleBounds = myBounds;
		} else {
			var myBounds = myObject.geometricBounds;
			if (myRWidth) {
				myBounds[3] = myBounds[1] + myEtalonWidth;
			}
			if (myRHeight) {
				myBounds[2] = [0] + myEtalonHeight;
			}
			myObject.geometricBounds = myBounds;
		}
	}
}

with (app) {
//Подключаем ini 	
	var myIniFile = new File (activeScript.path + "/makeSameSize.ini");
	if (!myIniFile.exists) {
		alert ("Cant open ini file!");
		exit();
	} else {
		eval ("//@include \'makeSameSize.ini\';");
	}
//Подключаем lang
	var myLangFile = new File (activeScript.path + "/" + iniLangFile);
	if (!myIniFile.exists) {
		alert ("Cant open lang file!");
		exit();
	} else {
		eval ("//@include \'" + iniLangFile + "\';");
	}
//Проверяем наличие открытого документа
	if (documents.length < 1) {
		alert (langNoDoc);
		exit ();
	}
//Проверяем количество выделенных объектов
	if (selection.length < 2) {
		alert (langNoSelection);
		exit ();
	}
//Подготавливаем массивы для информации о выделенных объектах
	var myObjectType = new Array();
	var myObjectWidth = new Array();
	var myObjectHeight = new Array();
	var myObjectPlusStrokeWidth = new Array ();
	var myObjectPlusStrokeHeight = new Array ();
	var myObjectStroke = new Array();
	var myObjectReference = new Array();
//Заполняем массивы
	for (myCounter = 0; myCounter < selection.length; myCounter++) {
		myObjectType[myCounter] = selection[myCounter].constructor.name;
		myObjectWidth[myCounter] = selection[myCounter].geometricBounds[3] - selection[myCounter].geometricBounds[1];
		myObjectHeight[myCounter] = selection[myCounter].geometricBounds[2] - selection[myCounter].geometricBounds[0];
		myObjectPlusStrokeWidth[myCounter] = selection[myCounter].visibleBounds[3] - selection[myCounter].visibleBounds[1];
		myObjectPlusStrokeHeight[myCounter] = selection[myCounter].visibleBounds[2] - selection[myCounter].visibleBounds[0];
		myObjectStroke[myCounter] = selection[myCounter].strokeWeight;
		myObjectReference[myCounter] = myObjectPlusStrokeWidth[myCounter].toPrecision(6) + " x " + myObjectPlusStrokeHeight[myCounter].toPrecision(6) + " : " + String(myObjectStroke[myCounter].toPrecision(4)) + " (" + String(myObjectType[myCounter]) + ")";
	}
	var myMinPlusStrokeWidth = getMinValue(myObjectPlusStrokeWidth)
	var myMinPlusStrokeHeight = getMinValue(myObjectPlusStrokeHeight);
	var myMaxPlusStrokeWidth = getMaxValue(myObjectPlusStrokeWidth)
	var myMaxPlusStrokeHeight = getMaxValue(myObjectPlusStrokeHeight);

	var myMinWidth = getMinValue(myObjectWidth)
	var myMinHeight = getMinValue(myObjectHeight);
	var myMaxWidth = getMaxValue(myObjectWidth)
	var myMaxHeight = getMaxValue(myObjectHeight);
//Создаем диалог
	var myDialog = dialogs.add({name: iniScriptName + " " + iniScriptVersion});
	with (myDialog.dialogColumns.add()) {
		with (borderPanels.add().dialogColumns.add()) {
			dialogRows.add().staticTexts.add({staticLabel:langInfo});
			var myBaseObject = dialogRows.add().dropdowns.add({stringList:myObjectReference, selectedIndex:0});
			dialogRows.add().staticTexts.add({staticLabel:langLegend});
			dialogRows.add().staticTexts.add({staticLabel:langMinValue + " " + myMinPlusStrokeWidth.toPrecision(6) + " x " + myMinPlusStrokeHeight.toPrecision(6)});
			dialogRows.add().staticTexts.add({staticLabel:langMaxValue + " " + myMaxPlusStrokeWidth.toPrecision(6) + " x " + myMaxPlusStrokeHeight.toPrecision(6)});
			dialogRows.add().staticTexts.add({staticLabel:langVisibleBounds});
		}
		with (borderPanels.add().dialogColumns.add()) {
			dialogRows.add().staticTexts.add({staticLabel:langSelectOptions});
			with (dialogRows.add()) {
				with (dialogColumns.add()) {
					dialogRows.add().staticTexts.add({staticLabel:langSelectBaseObject});
					var mySelectEtalon = radiobuttonGroups.add();
					with (mySelectEtalon) {
						radiobuttonControls.add({staticLabel:langObjectFromList});
						radiobuttonControls.add({staticLabel:langMinObject});
						radiobuttonControls.add({staticLabel:langMaxObject});
					}
					mySelectEtalon.selectedButton = 0;
				}

				with (dialogColumns.add()) {
					var myResizeWidth = dialogRows.add().checkboxControls.add({staticLabel:langResizeWidth, checkedState:iniResizeWidth});
					var myResizeHeight = dialogRows.add().checkboxControls.add({staticLabel:langResizeHeight, checkedState:iniResizeHeight});
					var myResizeContent = dialogRows.add().checkboxControls.add({staticLabel:langResizeContent, checkedState:iniResizeContent});
					var myCalcStroke = dialogRows.add().checkboxControls.add({staticLabel:langCalcStroke, checkedState:iniCalcStroke});
				}
			}
		}
		dialogRows.add().staticTexts.add({staticLabel:"\u00A9 Oleg Butrin - http://indesign.rudtp.ru"});
	}

//Отображаем диалог
	var myResult = myDialog.show();
	if (!myResult) {
		myDialog.destroy();
		exit ();
	}
	switch (mySelectEtalon.selectedButton) {
		case 0:
			if (myCalcStroke.checkedState) {
				var myWidth = myObjectPlusStrokeWidth[myBaseObject.selectedIndex];
				var myHeight = myObjectPlusStrokeHeight[myBaseObject.selectedIndex];
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectPlusStrokeWidth[myCounter];
					var myCurrentHeight = myObjectPlusStrokeHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			} else {
				var myWidth = myObjectWidth[myBaseObject.selectedIndex];
				var myHeight = myObjectHeight[myBaseObject.selectedIndex];		
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectWidth[myCounter];
					var myCurrentHeight = myObjectHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			}
			break;
		case 1:
			if (myCalcStroke.checkedState) {
				var myWidth = myMinPlusStrokeWidth;
				var myHeight = myMinPlusStrokeHeight;
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectPlusStrokeWidth[myCounter];
					var myCurrentHeight = myObjectPlusStrokeHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			} else {
				var myWidth = myMinWidth;
				var myHeight = myMinHeight;
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectWidth[myCounter];
					var myCurrentHeight = myObjectHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			}			
			break;
		case 2:
			if (myCalcStroke.checkedState) {
				var myWidth = myMaxPlusStrokeWidth;
				var myHeight = myMaxPlusStrokeHeight;
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectPlusStrokeWidth[myCounter];
					var myCurrentHeight = myObjectPlusStrokeHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			} else {
				var myWidth = myMaxWidth;
				var myHeight = myMaxHeight;
				for (myCounter = 0; myCounter < selection.length; myCounter++) {
					var myObject = selection[myCounter];
					var myCurrentWidth = myObjectWidth[myCounter];
					var myCurrentHeight = myObjectHeight[myCounter];
					resizeObject (myObject, myCurrentWidth, myCurrentHeight, myWidth, myHeight, myResizeWidth.checkedState, myResizeHeight.checkedState, myResizeContent.checkedState, myCalcStroke.checkedState)
				}
			}			
			break;
	}
	myDialog.destroy();
	exit ();
}