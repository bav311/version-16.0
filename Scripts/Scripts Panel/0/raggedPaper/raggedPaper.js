/* =========================================================================

NAME: Courvimeter

AUTHOR: Oleg Butrin (obutrin@indesign.rudtp.ru)
HOMEPAGE: http://indesign.rudtp.ru
DATE  : 08.04.2004 15:00

COMMENT:
Script apply ragged paper effect to selected rectangle

RIGHT:
You have the right to use and distribute this script.
You have the right to modify this script for own needs. 
It is desirable to send the variant to the author of a script.
You have no right to distribute the modified script from author's name.
You have no right to have profit from sale of a script.

The author of a script does not sustain the responsibility in all cases of loss data and other kinds of losses if they have arisen in the time of using a script.
You use this script at your own fear and risk.

============================================================================ */
//Создаем конструктор для объекта - описания точки пути
function dot () {
	if ((dot.arguments.length < 2) || ((dot.arguments.length > 2) && (dot.arguments.length < 6))) {
		return null;
		exit;
	}
	this.anchor = new Array(2);
	this.leftDirection = new Array(2);
	this.rightDirection = new Array(2);
//Для создания острой точки нужно всего 2 значения
	if (dot.arguments.length == 2) {
//Сокращенный вид описания точки - пара координат
		this.anchor[0] = dot.arguments[0];
		this.anchor[1] = dot.arguments[1];
		this.leftDirection[0] = dot.arguments[0];
		this.leftDirection[1] = dot.arguments[1];
		this.rightDirection[0] = dot.arguments[0];
		this.rightDirection[1] = dot.arguments[1];
	} else {
//Полный вид - три пары координат
		this.anchor[0] = dot.arguments[0];
		this.anchor[1] = dot.arguments[1];
		this.leftDirection[0] = dot.arguments[2];
		this.leftDirection[1] = dot.arguments[3];
		this.rightDirection[0] = dot.arguments[4];
		this.rightDirection[1] = dot.arguments[5];
	}
}
//Создаем конструктор описания пути
function path (id) {
//Идентификатор как описание (не пригодился в работе, но был полезен в разработке)
	if (id != null) {
		this.id = id;
//Массив точек пути
		this.dots = new Array();
		this.count = 0;
	} else {
		return null;
	}
}
//Функция добавления точек в путь
function addDot () {
//Через 2 аргумента
	if (addDot.arguments.length == 2) {
		var newDot = new dot (addDot.arguments[0], addDot.arguments[1]);
	}
//Через 6 аргументов
	if (addDot.arguments.length == 6) {
		var newDot = new dot (addDot.arguments[0], addDot.arguments[1], addDot.arguments[2], addDot.arguments[3], addDot.arguments[4], addDot.arguments[5]);
	}
//Вставляем точку и увеличиваем число точек на 1
	if (newDot) {
		this.dots.push(newDot);
		this.count++;
	} else {
		return null;
	}
}
//Определяем функцию как функцию прототипа
path.prototype.addDot = addDot;

//Функция для получения случайного значения в пределах аргуметов (целочисленный результат)
function percentRnd(minP, maxP) {
	if ((minP < 0) || (maxP > 100) || (minP > 100) || (maxP < 0)) {
		minP = 0;
		maxP = 100;
	}
	return Math.floor(minP + (maxP - minP) * Math.random());
}
//Функция для получения случайного значения в пределах аргуметов (дробный результат)
function realRnd(minP, maxP) {
	if ((minP < 0) || (maxP > 100) || (minP > 100) || (maxP < 0)) {
		minP = 0;
		maxP = 100;
	}
	return minP + (maxP - minP) * Math.random();
}
//Функция определения индекса точки в пути (для обработки реверсированных путей)
function getPointIndex (myX, myY, myPath) {
	var myRes = null;
	for (myCounter = 0; myCounter < myPath.pathPoints.length; myCounter++) {
		if ((myPath.pathPoints[myCounter].anchor[0] == myX) && (myPath.pathPoints[myCounter].anchor[1] == myY)) {
			myRes = myPath.pathPoints[myCounter].index;
			break;
		}
	}
	return myRes;
}

//Функция получения наименования еденицы измерения
function getViewUnits (myDoc) {
	var myRes = "";
	var myHorizUnit = myDoc.viewPreferences.horizontalMeasurementUnits;
	var myVertUnit = myDoc.viewPreferences.verticalMeasurementUnits;
	switch (myHorizUnit) {
		case 2054188905:
			myHorizUnit = "points";
			break;
		case 2054187363:
			myHorizUnit = "picas";
			break;
		case 2053729891:
			myHorizUnit = "inches";
			break;
		case 2053729892:
			myHorizUnit = "inchesDec";
			break;
		case 2053991795:
			myHorizUnit = "mm";
			break;
		case 2053336435:
			myHorizUnit = "cm";
			break;
		case 2053335395:
			myHorizUnit = "ciceros";
			break;
	}
	switch (myVertUnit) {
		case 2054188905:
			myVertUnit = "points";
			break;
		case 2054187363:
			myVertUnit = "picas";
			break;
		case 2053729891:
			myVertUnit = "inches";
			break;
		case 2053729892:
			myVertUnit = "inchesDec";
			break;
		case 2053991795:
			myVertUnit = "mm";
			break;
		case 2053336435:
			myVertUnit = "cm";
			break;
		case 2053335395:
			myVertUnit = "ciceros";
			break;
	}
	if (myHorizUnit != myVertUnit) {
		myRes = myHorizUnit + "/" + myVertUnit;
	} else {
		myRes = myHorizUnit;
	}
	return myRes;
	
}
//Функция проверки массива чекбоксов на количество включенных
function checkboxRevision (myArray) {
	var myRes = 0;
	for (myCounter = 0; myCounter < myArray.length; myCounter++) {
		if (myArray[myCounter].checkedState) {
			myRes++;
		}
	}
	return myRes;
}
//Функция нахождения первого из выбранных элементов массива чекбоксов
function checkboxSelectedIndex(myArray) {
	var myRes = null;
	for (myCounter = 0; myCounter < myArray.length; myCounter++) {
		if (myArray[myCounter].checkedState) {
			myRes = myCounter;
			break;
		}
	}
	return myRes;
}
//Функция создания пути от многих параметров
function createPath(startX, startY, endX, endY, direction, step, minStep, maxStep, negApm, minAmp, maxAmp, fixAmp) {
	var myResult = new path("result");
	if (step == -1) {
		step = realRnd(minStep, maxStep);
	} 
	if (fixAmp) {
		var myMinSide = Math.min((endX - startX),(endY - startY));
	} else {
		var myMinSide = null;
	}
	switch (direction) {
		case 0:
			if (myMinSide != null) {
				var myCount = Math.floor((myMinSide) / (step + 1));
			} else {
				var myCount = Math.floor((endX - startX) / (step + 1));
			}
			var myXInterval = (endX - startX) / myCount;
			var myYInterval = (endY - startY) / 100;
			for (myCounter = 0; myCounter < myCount - 1; myCounter++) {
				var xStep = startX + myXInterval * [myCounter + 1];
				var yStep = realRnd(minAmp, maxAmp) * myYInterval;
				if (negApm) {
					var myNegative = Math.random();
					if (myNegative < 0.5) {
						yStep = - yStep;
					}
				}
				yStep = startY - yStep;
				myResult.addDot(xStep, yStep);
			}
			break;
		case 1:
			if (myMinSide != null) {
				var myCount = Math.floor((myMinSide) / (step + 1));
			} else {
				var myCount = Math.floor((endY - startY) / (step + 1));
			}
			var myXInterval = (endX - startX) / 100;
			var myYInterval = (endY - startY) / myCount;
			for (myCounter = 0; myCounter < myCount - 1; myCounter++) {
				var xStep = realRnd(minAmp, maxAmp) * myXInterval;
				if (negApm) {
					var myNegative = Math.random();
					if (myNegative < 0.5) {
						xStep = - xStep;
					}
				}
				xStep = endX + xStep;
				var yStep = startY + myYInterval * [myCounter + 1];
				myResult.addDot(xStep, yStep);
			}
			break;
		case 2:
			if (myMinSide != null) {
				var myCount = Math.floor((myMinSide) / (step + 1));
			} else {
				var myCount = Math.floor((endX - startX) / (step + 1));
			}
			var myXInterval = (endX - startX) / myCount;
			var myYInterval = (endY - startY) / 100;
			for (myCounter = 0; myCounter < myCount - 1; myCounter++) {
				var xStep = endX - myXInterval * [myCounter + 1];
				var yStep = realRnd(minAmp, maxAmp) * myYInterval;
				if (negApm) {
					var myNegative = Math.random();
					if (myNegative < 0.5) {
						yStep = - yStep;
					}
				}
				yStep = endY + yStep;
				myResult.addDot(xStep, yStep);
			}
			break;
		case 3:
			if (myMinSide != null) {
				var myCount = Math.floor((myMinSide) / (step + 1));
			} else {
				var myCount = Math.floor((endY - startY) / (step + 1));
			}
			var myXInterval = (endX - startX) / 100;
			var myYInterval = (endY - startY) / myCount;
			for (myCounter = 0; myCounter < myCount - 1; myCounter++) {
				var xStep = realRnd(minAmp, maxAmp) * myXInterval;
				if (negApm) {
					var myNegative = Math.random();
					if (myNegative < 0.5) {
						xStep = - xStep;
					}
				}
				xStep = startX - xStep;
				var yStep = endY - myYInterval * [myCounter + 1];
				myResult.addDot(xStep, yStep);
			}
			break;
	}
	return myResult;
}
//Функция отзеркаливания пути
function mirrorPath (startX, startY, endX, endY, direction, myPath) {
	var myRes = new path ("mirror");
	switch (direction) {
		case 0:
			for (myCounter = 0; myCounter < myPath.count; myCounter++) {
				var xStep = myPath.dots[myCounter].anchor[0];
				var yStep = startY - (myPath.dots[myCounter].anchor[1] - startY);
				myRes.addDot(xStep, yStep);
			}
			break;
		case 1:
			for (myCounter = 0; myCounter < myPath.count; myCounter++) {
				var xStep = endX - (myPath.dots[myCounter].anchor[0] - endX);
				var yStep = myPath.dots[myCounter].anchor[1];
				myRes.addDot(xStep, yStep);
			}
			break;
		case 2:
			for (myCounter = 0; myCounter < myPath.count; myCounter++) {
				var xStep = myPath.dots[myCounter].anchor[0];
				var yStep = endY - (myPath.dots[myCounter].anchor[1] - endY);
				myRes.addDot(xStep, yStep);
			}
			break;
		case 3:
			for (myCounter = 0; myCounter < myPath.count; myCounter++) {
				var xStep = startX - (myPath.dots[myCounter].anchor[0] - startX);
				var yStep = myPath.dots[myCounter].anchor[1];
				myRes.addDot(xStep, yStep);
			}
			break;
	}
	return myRes;
}
//Функция преобразования пути в массив нужного вида
function convertPath (mySourcePath) {
	var myRes = new Array();
	for (myCounter = 0; myCounter < mySourcePath.count; myCounter++) {
		myRes[myCounter] = new Array (mySourcePath.dots[myCounter].anchor, mySourcePath.dots[myCounter].leftDirection, mySourcePath.dots[myCounter].rightDirection);
	}	
	return myRes;
}
//Функция суммирования путей
function pathsToArray() {
	var pathCount = pathsToArray.arguments.length;
	var myRes = new Array();
	for (myCounter = 0; myCounter < pathCount; myCounter++) {
		myRes = myRes.concat(convertPath(pathsToArray.arguments[myCounter]));
	}
	return myRes;
}
//Основная часть
with (app) {
//Подключаем ini 	
	var myIniFile = new File (activeScript.path + "/raggedPaper.ini");
	if (!myIniFile.exists) {
		alert ("Cant open ini file!");
		exit();
	} else {
		eval ("//@include \'raggedPaper.ini\';");
	}
//Подключаем lang
	var myLangFile = new File (activeScript.path + "/" + iniLangFile);
	if (!myIniFile.exists) {
		alert ("Cant open lang file!");
		exit();
	} else {
		eval ("//@include \'" + iniLangFile + "\';");
	}
//Проверяем документ, выбранный объект, тип объекта	
	if (documents.length < 1) {
		alert(langNoDoc);
		exit();
	}
	if (selection.length == 0) {
		alert(langNoSelection);
		exit();
	}
	if (selection.length > 1) {
		alert(langTooManySelection);
		exit();
	}
	if (selection[0].constructor.name != "Rectangle") {
		alert(langNotRectangleSelect);
		exit();
	}
//Определяем ректангл	
	var myRectangle = selection[0];
//Определяем его параметры
	var myWidth = myRectangle.geometricBounds[3] - myRectangle.geometricBounds[1];
	var myHeight = myRectangle.geometricBounds[2] - myRectangle.geometricBounds[0];
//Инициализируем диалог
	var myDialog = dialogs.add({name:iniScriptName + " " + iniScriptVersion});
	with (myDialog) {
		with (dialogColumns.add()) {
			with (borderPanels.add().dialogColumns.add()) {
				var mySideChkBox = new Array();
				dialogRows.add().staticTexts.add({staticLabel:langSelectSides});
				with(dialogRows.add()) {
					with (dialogColumns.add()) {
						mySideChkBox[0] = checkboxControls.add({staticLabel:langTop});
						mySideChkBox[1] = checkboxControls.add({staticLabel:langRight});
					}
					with (dialogColumns.add()) {
						mySideChkBox[2] = checkboxControls.add({staticLabel:langBottom});
						mySideChkBox[3] = checkboxControls.add({staticLabel:langLeft});
					}
				}
			}
			with (borderPanels.add().dialogColumns.add()) {
				dialogRows.add().staticTexts.add({staticLabel:langRectanleParams});
				dialogRows.add().staticTexts.add({staticLabel:langWidth + " " + myWidth.toPrecision(10)});
				dialogRows.add().staticTexts.add({staticLabel:langHeight + " " + myHeight.toPrecision(10)});
				dialogRows.add().staticTexts.add({staticLabel:langStroke + " " + String(myRectangle.strokeWeight) + " pt"});
			}
			dialogRows.add().staticTexts.add({staticLabel:"\u00A9 Oleg Butrin"});
			dialogRows.add().staticTexts.add({staticLabel:"http://indesign.rudtp.ru"});
		}
		with (dialogColumns.add()) {
			with (borderPanels.add().dialogColumns.add()){
				dialogRows.add().staticTexts.add({staticLabel:langRaggParameters});
				with (dialogRows.add()) {
					with (dialogColumns.add()) {
						dialogRows.add().staticTexts.add({staticLabel:langStepInterval + getViewUnits(activeDocument) + ":"});
						var myRaggDots = dialogRows.add().radiobuttonGroups.add();
						myRaggDots.radiobuttonControls.add({staticLabel:langNumber, checkedState:iniRaggNumCheck});
						myRaggDots.radiobuttonControls.add({staticLabel:langRandom + " " + iniMinUnits + " .. " + iniMaxUnits, checkedState:iniRaggRandCheck});
						dialogRows.add().staticTexts.add({staticLabel:langMinAmplitude});
						dialogRows.add().staticTexts.add({staticLabel:langMaxAmplitude});
						var myFixedAmplitude = dialogRows.add().checkboxControls.add({staticLabel:langFixedAmpplitude, checkedState:iniFixedAmpplitude});
						var myNegativeAmplitude = dialogRows.add().checkboxControls.add({staticLabel:langNegativeAmplitude, checkedState:iniNegativeAmplitude});
						var myDuplicateObject = dialogRows.add().checkboxControls.add({staticLabel:langDuplicateObject, checkedState:iniDuplicateObject});
						var myMirrorObject = dialogRows.add().checkboxControls.add({staticLabel:langMirrorObject, checkedState:iniMirrorObject});
					}
					with (dialogColumns.add()) {
						dialogRows.add().staticTexts.add({staticLabel:" "});
						var myRaggInterval = dialogRows.add().realEditboxes.add({minWidth:50, minimumValue:iniMinUnits, maximumValue:iniMaxUnits, editValue:iniMinUnits, smallNudge:0.1, largeNudge:0.5});
						dialogRows.add().staticTexts.add({staticLabel:" "});
						var myMinAmplitude = dialogRows.add().percentEditboxes.add({minWidth:50, minimumValue:0, maximumValue:iniMinAmplitude, editValue:0, smallNudge:1, largeNudge:5});
						var myMaxnAmplitude = dialogRows.add().percentEditboxes.add({minWidth:50, minimumValue:iniMinAmplitude, maximumValue:iniMaxAmplitude, editValue:iniMaxAmplitude, smallNudge:1, largeNudge:5});
					}
				}
			}
		}
	}
//Кажем диалог
	var myResult = myDialog.show();
	if (!myResult) {
		myDialog.destroy();
		exit();
	}
//Проверяем на возможность создания дополнительного объекта
	if ((myMirrorObject.checkedState) && (checkboxRevision(mySideChkBox) > 1)) {
		alert (langCantCreateMirror);
		exit();
	}
//Проверяем на дупликатирование
	if (myDuplicateObject.checkedState) {
		var myObject = myRectangle.duplicate();
	} else {
		myObject = myRectangle;
	}
//Проверяем запрос создания дополнительного объекта
	if (myMirrorObject.checkedState) {
		var myMirror = myObject.duplicate();
	}
//Устанавливаем базовуй путь	
	var myPath = myObject.paths[0];
//Устанавливаем параметры
	var myBounds = myObject.geometricBounds;
//Объявляем для каждой точки по объекту-пути	
	var myTopLeft = new path("TL");
	var myTopRight = new path("TR");
	var myBottomLeft = new path("BL");
	var myBottomRight = new path("BR");
//Добавляем в пути параметры базовых точек
	myTopLeft.addDot(myBounds[1], myBounds[0]);
	myTopRight.addDot(myBounds[3], myBounds[0]);
	myBottomRight.addDot(myBounds[3], myBounds[2]);
	myBottomLeft.addDot(myBounds[1], myBounds[2]);
//Проверяем на случайность шага	
	switch (myRaggDots.selectedButton) {
		case 0:
			var myUnitsPerDot = myRaggInterval.editValue;
			break;
		case 1:
			var myUnitsPerDot = -1;
	}
//Проверяем включенность сторон и создаем пути сторон	
	if (mySideChkBox[0].checkedState) {
		var myTopPath = createPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 0, myUnitsPerDot, iniMinUnits, iniMaxUnits, myNegativeAmplitude.checkedState, iniMinAmplitude, iniMaxAmplitude, myFixedAmplitude.checkedState);
	} else {
		var myTopPath = new path ("0");
	}
	if (mySideChkBox[1].checkedState) {
		var myRightPath = createPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 1, myUnitsPerDot, iniMinUnits, iniMaxUnits, myNegativeAmplitude.checkedState, iniMinAmplitude, iniMaxAmplitude, myFixedAmplitude.checkedState);
	} else {
		var myRightPath = new path ("0");
	}
	if (mySideChkBox[2].checkedState) {
		var myBottomPath = createPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 2, myUnitsPerDot, iniMinUnits, iniMaxUnits, myNegativeAmplitude.checkedState, iniMinAmplitude, iniMaxAmplitude, myFixedAmplitude.checkedState);
	} else {
		var myBottomPath = new path ("0");
	}
	if (mySideChkBox[3].checkedState) {
		var myLeftPath = createPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 3, myUnitsPerDot, iniMinUnits, iniMaxUnits, myNegativeAmplitude.checkedState, iniMinAmplitude, iniMaxAmplitude, myFixedAmplitude.checkedState);
	} else {
		var myLeftPath = new path ("0");
	}
//Создаем результрующий массив из всех созданных путей	
	var myResultArray = pathsToArray(myTopLeft, myTopPath, myTopRight, myRightPath, myBottomRight, myBottomPath, myBottomLeft, myLeftPath);
//Применяем путь к объекту
	myPath.entirePath = myResultArray;
//Если нужно создать дополняющий объект	
	if (myMirror) {
		var myMirrorPath = new path ("mirror");
		var myMirrorSide = checkboxSelectedIndex (mySideChkBox);
//Для сторон создаем антипуть, результируем пути в массив, применяем массив к объекту и трансформируем объект
		switch (myMirrorSide) {
			case 0:
				myMirrorPath = mirrorPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 0, myTopPath);
				myResultArray = pathsToArray(myTopLeft, myMirrorPath, myTopRight, myRightPath, myBottomRight, myBottomPath, myBottomLeft, myLeftPath);
				myMirror.paths[0].entirePath = myResultArray;
				myMirror.rotate(180, 1095660643);
				myMirror.resize(-100);
				break;
			case 1:
				myMirrorPath = mirrorPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 1, myRightPath);
				myResultArray = pathsToArray(myTopLeft, myTopPath, myTopRight, myMirrorPath, myBottomRight, myBottomPath, myBottomLeft, myLeftPath);
				myMirror.paths[0].entirePath = myResultArray;
				myMirror.resize(-100);
				break;
			case 2:
				myMirrorPath = mirrorPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 2, myBottomPath);
				myResultArray = pathsToArray(myTopLeft, myTopPath, myTopRight, myRightPath, myBottomRight, myMirrorPath, myBottomLeft, myLeftPath);
				myMirror.paths[0].entirePath = myResultArray;
				myMirror.rotate(180, 1095660643);
				myMirror.resize(-100);
				break;
			case 3:
				myMirrorPath = mirrorPath(myBounds[1], myBounds[0], myBounds[3], myBounds[2], 3, myLeftPath);
				myResultArray = pathsToArray(myTopLeft, myTopPath, myTopRight, myRightPath, myBottomRight, myBottomPath, myBottomLeft, myMirrorPath);
				myMirror.paths[0].entirePath = myResultArray;
				myMirror.resize(-100);
				break;
		}
		myMirror.paths[0].entirePath = myResultArray;
		myMirror.rotate(180, 1095656308);
		myMirror.resize(-100);
	}
//Выход
	myDialog.destroy();
	exit();
}