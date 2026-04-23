// MultiPageImporter2.6.2 jsx
// An InDesign CS4 JavaScript
// 28 MAR 2010
// Copyright (C) 2008-2009 Scott Zanelli. lonelytreesw@gmail.com
// Coming to you from South Easton, MA, USA

// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

// Version 2.1:  Fix for CS4 compatibility. (04 MAR 2009)
// Version 2.2: Map pages to exisitng doc pages and reverse the page order options added. (05 MAR 2009)
// Version 2.2.1: Page rotation. (12 MAR 2009)
// Version 2.5: If PDF page count/size can't be determined, import all pages. Remove dependency on Verdana. (28 MAR 2010)
// Version 2.5JJB: Added support for ID CS5 PDF importing. The PDFCrop constants used in IDCS5 are now supported (14 FEB 2011). See lines 126-139. //JJB         
// Version 2.6: Fixed a bug that would display a misleading error message ("This value would cause one or more objects to leave the pasteboard.") - mostly in cases where the default font size for a new text box would cause a 20x20 document units box to overflow
// Version 2.6.1: Added new document scale for easy page scaling and tag all placed frames
// Version 2.6.2: Added very basic support for .ai files that are written as pdf compatible files - basically using the pdf code for them - allows for automatically placing multi-artboard AIs

// Get app version and save old interation setting.
// Some installs have the interaction level set to not show any dialogs.
// This is used to insure that the dialog is shown.

// 2023. Интерфейс программы переведён на русский язык.  https://dotextok.ru

var m01 = "Скрипт для индизайна версий CS3 и всех последующих";// "Features used in this script will only work in InDesign CS3 or later.";
var m02 = "Вверху слева"; //"Top left";
var m03 = "Верху по центру"; //"Top center";
var m04 = "Верху справа"; // "Top right";
var m05 = "По центру слева"; // "Center left";
var m06 = "В центре"; // "Center";
var m07 = "По центру справа "; // "Center right";
var m08 = "Внизу слева"; // "Bottom left";
var m09 = "Внизу по центру"; // "Bottom center";
var m10 = "Внизу справа"; // "Bottom right";
var m11 = "Выбрать для помещения файл: PDF, AI- или InDesign"; // "Select a PDF, PDF compatible AI or InDesign file to place:";
var m12 = "помещаются: *.indd;*.pdf;*.ai"; // "Placeable: *.indd;*.pdf;*.ai";
var m13 = "Надо было выбрать файл: PDF, AI- или InDesign. Завершение"; // "A PDF, PDF compatible AI or InDesign file must be chosen. Quitting...";
var m14 = "Кадрирование"; // "Crop";
var m15 = "Содержимое"; // "Art";
var m16 = "Обрезка"; // "Trim";
var m17 = "Выпуск за обрез"; // "Bleed";
var m18 = "Материал"; // "Media";
var m19 = "Ограничительная рамка для всех слоев"; // "All Layers Bounding Box";
var m20 = "Ограничительная рамка для видимых слоев"; // "Visible Layers Bounding Box";
var m21 = "Ограничительная рамка"; // "Bounding Box";
var m22 = "Ограничительная рамка страницы"; // "Page bounding box";
var m23 = "Ограничительная рамка выпуска за обрез"; // "Bleed bounding box";
var m24 = "Ограничительная рамка служебной области"; // "Slug bounding box";
var m25 = "\" не содержит \""; // "\" doesn't contain a \"";
var m26 = "\" вариант границы обрезки:\n\nПопробуйте выбрать другой вариант границы обрезки или откройте\nэтот PDF-файл в Акробате и выполните команду \"Save As...\"."; // "\" crop type:\n\nPlease try again by selecting a different crop type or open\nthe PDF in Acrobat and perform a \"Save As...\" command.";
var m27 = "Ошибка помещения PDF-файла"; // "PDF Placement Error";
var m28 = "Импорт нескольких "; // "Import Multiple ";
var m29 = " страниц"; // " Pages";
var m30 = "Выбор страниц"; // "Page Selection";
var m31 = "Импорт "; // "Import ";
var m32 = " cтраниц "; // " Pages:";
var m33 = "до"; // "thru"; 
var m34 = "Страницы PDF-файла на конкретных страницах вёрстки"; // "Map to Doc Pages";
var m35 = "Страницы в обратном порядке"; // "Reverse Page Order";
var m36 = "Невозможно определить PDF"; // "Cannot determine PDF";
var m37 = "Количество страниц:"; // "page count: all pages";
var m38 = "все страницы будут помещены. "; // "will be imported.";
var m39 = "Размещение документа начать со страницы:"; // "Start Placing on Doc Page:"; 
var m40 = "Изменение размеров"; // "Sizing Options";
var m41 ="Подогнать под размер страницы"; // "Fit to Page";
var m42 = "Сохранить пропорции"; // "Keep Proportions";
var m43 = "Выпуск за обрез подогнанной страницы"; // "Bleed the Fit Page";
var m44 = "Масштаб импортируемой страницы:"; // "Scale of Imported Page:";
var m45 = "Установки позиционирования"; // "Positioning Options";
var m46 = "Выравнивание при размещении на странице:"; // "Position on Page Aligned From:";
var m47 = "по верху, относительно корешка"; // "Top, relative to spine";
var m48 = "по центру, относительно корешка"; // "Center, relative to spine";
var m49 = "по низу, относительно корешка"; // "Bottom, relative to spine";
var m50 = "Поворот"; // "Rotatation:";
var m51 = "Смещение:"; // "Offset by:";
var m52 = "Установки помещения"; // "Placement Options";
var m53 = "Варианты обрезки"; // "Crop to:"; // [10,18,60,35]
var m54 = "Помещение страниц на новом слое"; // "Place Pages on a New Layer";
var m55 = "Игнорировать ошибки шрифтов и изображений"; // "Ignore Font and Image Errors";
var m56 = "Прозрачный фон PDF-файла"; // "Transparent PDF Background";
var m57 = "Не удалось загрузить настройки программы"; // "Could not read preferences: ";
var m58 = "Не удалось сохранить настройки программы"; // "Could not save preferences: ";
var m59 = "Не удалось определить число страниц"; // "Cannot determine page count.";
var m60 = "Новозможно найти корневой объект"; // "Unable to find Root object.";
var m61 = "Невозможно определить длину словарной строки xref"; // "Unable to determine xref dictionary line length.";
var m62 = "Невозможно определить размер страницы PDF-файла"; // "Unable to determine PDF page size.";
var m63 = "Один или оба размера страницы не могут быть вычислены"; // "One or both page dimensions could not be calculated.";
var m64 = "---"; // "dummy";
var m65 = "Ошибка: "; // "ERROR: ";
var m66 = "Ошиба работы скрипта"; // "MultiPageImporter Script Error";
var m67 = "Начало размещения страницы документа"; // "Start Placing on Doc Page";
var m68 = "Ошибка: неправильный номер страницы"; // "Invalid Page Number Error";
var m69 = "Введите '"; // "Please enter '";
var m70 = "' номер страницы."; // "' page as a number.";
var m71 = "Начальный "; //"The '";
var m72 = " номер страницы должен быть равен хотя бы 1."; // "' page number must be at least 1.";
var m73 = " номер страницы должен быть "; // "' page number must be ";
var m74 = " или меньше."; // " or less.";
var m74a = "Ошибка в указании диапазона обрабатываемых страниц.";
var m75 = "Введите число в "; // "Please enter a number in the ";
var m76 = " поле указания процентов."; // " percentage box!";
var m77 = "Ошибка ввода значения в процентах"; // "Invalid Percentage Error";
var m78 = "Значение должно быть от 1 до 400% в "; // "Value must be between 1% and 400% in the ";
var m79 = "Определите значение в "; // "Please use a number in the ";
var m80 = " поле смещения."; // " offset box!";
var m81 = "Ошибка ввода смещения"; // "Invalid Offset Error";
var m82 = "Начальный номер страницы должен быть меньше или равен последнему номеру."; // "Start Page must be less than or equal to the End Page.";
var m83 = "Соответствие номеров страниц"; // "Map Pages";
var m84 = "Соответствие "; // "Map ";
var m85 = " страниц страницам документа ("; // " pages to desired Document pages (";
var m86 = "->Doc):"; // "->Doc):";
var m87 = "Введены повторяющиеся номера страниц. Убедитесь, что номера страниц не совпадают."; // "A duplicate page was entered. Please make sure all drop downs have a unique selection.";
var m88 = "Ошибка: совпадение номеров страниц документа"; // "Duplicate Mapping Error";
//~ var m89 = "Mapping is not available: There are not enough document pages to place the PDFs in the selected page range " +
//~ 			       "onto their own document pages. Either reduce the number of PDF pages in the range or increase the " + 
//~ 				   "number of pages in the document that the PDF pages are being placed into.";
var m89 = "Невозможно подготовить соответствие номеров страниц: недостаточно страниц документа для размещения PDF-файлов в выбранном диапазоне страниц на их собственных страницах документа. Либо уменьшите количество PDF-страниц в диапазоне, либо увеличьте количество страниц в документе, в который помещаются PDF-страницы.";                   
var m90 = "Ошибка установки соответствия страниц"; // "Mapping Error";
var m91 = "Импорт многостраничных файлов.pdf";
var m92 = "Не найден PDF-файл с описанием этой программы. Он называется '";
var m93 = "' и должен быть в папке 'Info' этого скрипта.";
var m94 = "не помещать"; // skip

var appVersion = parseInt(app.version);
// Only works in CS3+
if(appVersion >= 5) {
	var oldInteractionPref = app.scriptPreferences.userInteractionLevel;
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    }
else {
	alert(m01); // "Features used in this script will only work in InDesign CS3 or later."
	exit(-1);
    }

// Set the next line to false to not use prefs
var usePrefs = true;

// Set default prefs
var pdfCropType = 0;
var indCropType = 1;
var offsetX = 0;
var offsetY = 0;
var doTransparent = 1;
var placeOnLayer = 0;
var fitPage = 0;
var keepProp = 0;
var addBleed = 1;
var ignoreErrors = 0;
var percX = 100;
var percY = 100;
var mapPages = 0;
var reverseOrder = 0;
var rotate = 0;
var positionType = 4; // 4 = center

// Do not change anything after this line!
// removed 6/25/08: var indUpdateType = 0;
var cropType = 0;
var PDF_DOC = "PDF";
var IND_DOC = "InDesign";
var tempObjStyle = null;
var dLog; // Kludge for callback function that uses the dLog, but can't be given the dLog directly
var ddArray;
var ddIndexArray;
var numArray;
var getout;
var doMapCheck = true;
var rotateValues = [0,90,180,270];
//var positionValuesAll = ["Top left", "Top center", "Top right", "Center left",  "Center", "Center right", "Bottom left",  "Bottom center",  "Bottom right"];
var positionValuesAll = [m02, m03, m04, m05, m06, m07, m08, m09, m10];
var noPDFError = true;

// Look for and read prefs file
//prefsFile = File((Folder(app.activeScript)).parent + "/MultiPageImporterPrefs2.5.txt"); 

// изменена работа с файлом установок, чтобы скрипт можно было смотреть в отладчике
var myDefSetName  = "MultiPageImporterPrefs.Rus.txt"; // это файл установок программы
var myScriptFile = myGetScriptPath();
var myScriptFolder = decodeURI(myScriptFile.path);
var myFilePath = decodeURI(myScriptFolder + "/" + myDefSetName); 
var prefsFile = new File (myFilePath);

if (!prefsFile.exists) { savePrefs(true); }	
else { readPrefs(); }
////
function myGetScriptPath() { // myGetScriptPath
	try { return app.activeScript;}
	catch (myError) { return File(myError.fileName); }
} //myGetScriptPath()
////
// Ask user to select the PDF/InDesign file to place
var askIt = m11;
if (File.fs =="Windows") { var theFile = File.openDialog(askIt, m12); }
else if (File.fs == "Macintosh") { var theFile = File.openDialog(askIt, macFileFilter);}
else { var theFile = File.openDialog(askIt);}

// Check  if cancel was clicked
if (theFile == null) { exit(); } // user clicked cancel, just leave
// Check if a file other than PDF or InDesign chosen
else if ((theFile.name.toLowerCase().indexOf(".pdf") == -1 && theFile.name.toLowerCase().indexOf(".ind") == -1 && theFile.name.toLowerCase().indexOf(".ai") == -1 )) {
	 restoreDefaults(false);
	 throwError(m13, false, 1, null);
    }

var fileName = File.decode(theFile.name);

if ((theFile.name.toLowerCase().indexOf(".pdf") != -1) || (theFile.name.toLowerCase().indexOf(".ai") != -1)) { // != -1
	// Premedia Systems/JJB Edit Start - 02/14/11 Modified PDFCrop constants to support ID CS3 through CS5 PDFCrop Types.
	if (appVersion > 6) {
		// CS5 or newer
		var cropTypes = [PDFCrop.cropPDF, PDFCrop.cropArt, PDFCrop.cropTrim, PDFCrop.cropBleed, PDFCrop.cropMedia, PDFCrop.cropContentAllLayers, PDFCrop.cropContentVisibleLayers];
		//var cropStrings = ["Crop","Art","Trim","Bleed", "Media","All Layers Bounding Box","Visible Layers Bounding Box"];
		var cropStrings = [m14, m15, m16,  m17, m18, m19, m20];        
        }
	else {
		// CS3 or CS4
		var cropTypes = [PDFCrop.cropContent, PDFCrop.cropArt, PDFCrop.cropPDF, PDFCrop.cropTrim, PDFCrop.cropBleed, PDFCrop.cropMedia];
	//	var cropStrings = ["Bounding Box","Art","Crop","Trim","Bleed", "Media"];
		var cropStrings = [m21, m15, m14, m16, m17, m18];        
        }
	// Premedia Systems/JJB Edit End
	
	// Parse the PDF file and extract needed info
	try { var placementINFO = getPDFInfo(theFile, (app.documents.length == 0)); }
	catch(e) { // catch
		// Couldn't determine the PDF info, revert to just adding all the pages
		noPDFError = false;
		placementINFO = new Array();
		
		if (app.documents.length == 0) {
			var tmp = new Array();
			tmp["width"] = 612;
			tmp["height"] = 792;
			placementINFO["pgSize"]  = tmp;
            }
        } // catch
	placementINFO["kind"] = PDF_DOC;
}  // != -1
else {
	var cropTypes = [ImportedPageCropOptions.CROP_CONTENT, ImportedPageCropOptions.CROP_BLEED, ImportedPageCropOptions.CROP_SLUG];
//	var cropStrings = ["Page bounding box","Bleed bounding box","Slug bounding box"];
	var cropStrings = [m22,  m23, m24];    
	// Get the InDesign doc's info
	var placementINFO = getINDinfo(theFile);
	placementINFO["kind"] = IND_DOC;
    }

// If there is no document open, create a new one using the size of the
// first encountered page
var theDocIsMine = false; // Is the doc created by this script boolean
if(app.documents.length == 0) { // .length == 0
	// Save the app measurement units to restore after doc is created
	var oldUnitsV = app.viewPreferences.verticalMeasurementUnits;
	var oldUnitsH = app.viewPreferences.horizontalMeasurementUnits;
	var oldMarginT = app.marginPreferences.top;
	var oldMarginB = app.marginPreferences.bottom;
	var oldMarginL = app.marginPreferences.left;
	var oldMarginR = app.marginPreferences.right;
	app.marginPreferences.top = 0;
	app.marginPreferences.bottom = 0;
	app.marginPreferences.left = 0;
	app.marginPreferences.right = 0;

	if(placementINFO.kind == PDF_DOC) {
		app.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
		app.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
        }
	else {
		app.viewPreferences.verticalMeasurementUnits = placementINFO.vUnits;
		app.viewPreferences.horizontalMeasurementUnits = placementINFO.hUnits;
        }

	// Make the new doc:
	var theDoc = app.documents.add();
    theDocIsMine = true;
	theDoc.documentPreferences.facingPages = false;
	theDoc.marginPreferences.columnCount = 1;
	theDoc.documentPreferences.pageWidth = placementINFO.pgSize.width;
	theDoc.documentPreferences.pageHeight = placementINFO.pgSize.height;
	theDoc.viewPreferences.verticalMeasurementUnits = oldUnitsV;
	theDoc.viewPreferences.horizontalMeasurementUnits = oldUnitsH;

	// Restore the original units
	app.viewPreferences.verticalMeasurementUnits = oldUnitsV;
	app.viewPreferences.horizontalMeasurementUnits = oldUnitsH;
	app.marginPreferences.top = oldMarginT;
	app.marginPreferences.bottom = oldMarginB;
	app.marginPreferences.left = oldMarginL;
	app.marginPreferences.right = oldMarginR;
} // .length == 0
else { var theDoc = app.activeDocument; }

var currentLayer = theDoc.activeLayer;
var docPgCount = theDoc.pages.length;

// Get and display the dialog
dLog = makeDialog();
dLog.center(); // Center dialog in screen

if (dLog.show() == 1) { // show() == 1
	// Extract info from dialog info
	if(noPDFError) {
		startPG = Number(dLog.startPG.text);
		endPG = Number(dLog.endPG.text);
		mapPages = Number(dLog.mapPages.value);
		reverseOrder = Number(dLog.reverseOrder.value);
        }
	else {
		startPG = 1;
		endPG = 99999;
        }
	docStartPG = Number(dLog.docStartPG.text);
	cropType = dLog.cropType.selection.index;
	offsetX = Number(dLog_offsetX.text);
	offsetY = Number(dLog_offsetY.text);
	percX = Number(dLog_percX.text);
	percY = Number(dLog_percY.text);
	rotate = dLog.rotate.selection.index;
	if (placementINFO.kind == PDF_DOC) {
		doTransparent = dLog.doTransparent.value;
        }
	ignoreErrors = dLog.ignoreErrors.value;
	placeOnLayer = dLog.placeOnLayer.value;
	fitPage = dLog.fitPage.value;
	keepProp = dLog.keepProp.value;
	addBleed = dLog.addBleed.value;
	positionType = dLog.posDropDown.selection.index;
} // show() == 1
else {
	restoreDefaults(false);
	exit();
}

// Check whether to do page mapping
if (mapPages && noPDFError) { // && noPDFError
	ddArray = new Array(docPgCount);
	ddIndexArray = new Array(docPgCount);
	numArray = new Array(docPgCount+1);
	
	// Fill the ddIndexArray with 1 to # of PDF pages
	for (i=startPG, j= 1; i < docPgCount + startPG; i++, j++) { ddIndexArray[i%docPgCount] = j; }
	
	// Fill the numArray with all the document page numbers
	numArray[0] = m94; //"skip";
	for(i=1; i<=docPgCount; i++) { numArray[i]=(i).toString(); }
	
	mapDlog = createMappingDialog(startPG, endPG, numArray);
	mapDlog.center();
	if (mapDlog.show() == 2) {
		// Cancel clicked
		restoreDefaults(false);
		exit(0);
        }
} // && noPDFError

// Dialog is no longer needed, let it eventually be garbage collected
dLog = null;

// Add the new layer if requested
if (placeOnLayer) { // placeOnLayer
	// Add random number to file name to be layer name.
	// Double check layer name doesn't exist and alter if it happens to be present for some reason
	var layerName = fileName + "_" + Math.round(Math.random() * 9999);
	var docLayers = theDoc.layers;
	for (i=0; i < docLayers.length; i++) { // i++
		if (docLayers[i].name.indexOf(layerName) != -1 ) { layerName += ("_" + Math.round(Math.random() * 9999)); }
        } // i++
	
	// Add the layer
	currentLayer = theDoc.layers.add({name:layerName});
    } // placeOnLayer

// Save zero point for later restoration
var oldZero = theDoc.zeroPoint;
// set the zero point to the origin
theDoc.zeroPoint = [0,0];

// Save ruler origin for later restoration
var oldRulerOrigin = theDoc.viewPreferences.rulerOrigin;
// set the ruler origin to page or all PDFs will be placed on first page of spreads
theDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

if ( theDocIsMine ) {
    theDoc.documentPreferences.pageWidth  *= percX/100;
    theDoc.documentPreferences.pageHeight *= percY/100;
    }

// Get the Indy doc's height and width
var docWidth = theDoc.documentPreferences.pageWidth;
var docHeight = theDoc.documentPreferences.pageHeight;

// Set placement prefs
if (placementINFO.kind == PDF_DOC) {
	with (app.pdfPlacePreferences) {
		transparentBackground = doTransparent;
		pdfCrop = cropTypes[cropType];
        }
    }
else { app.importedPageAttributes.importedPageCrop = cropTypes[cropType]; }

// Block errors if requested
if (ignoreErrors) { app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; }

// Create the Object Style to be applied to the placed pages.
var tempObjStyle = theDoc.objectStyles.add();
tempObjStyle.name = "MultiPageImporter_Styler_" + Math.round(Math.random() * 9999);
tempObjStyle.strokeWeight = 0; // Make sure there's no stroke
tempObjStyle.fillColor = "None"; // Make sure fill is none
tempObjStyle.enableAnchoredObjectOptions = true;

// Set the anchor properties
var tempAOS = tempObjStyle.anchoredObjectSettings;
tempAOS.anchoredPosition = AnchorPosition.ANCHORED;
tempAOS.spineRelative = false;
tempAOS.lockPosition = false;
tempAOS.verticalReferencePoint = AnchoredRelativeTo.PAGE_EDGE;
tempAOS.horizontalReferencePoint = AnchoredRelativeTo.PAGE_EDGE;
tempAOS.anchorXoffset = offsetX;
tempAOS.anchorYoffset = offsetY;

// Set the placement options based on user selected position
// The -1 is needed to get rectangle to move correctly when using the auto positioning of the object styles
// Could be a bug since just the left positions need the negative multiple (spine doesn't need the negative multiple)
switch(positionType) { // switch
	case 0: //  Top Left
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.TOP_LEFT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.TOP_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.LEFT_ALIGN;		
		break;
	case 1: // Top Center
		tempAOS.anchorPoint = AnchorPoint.TOP_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.TOP_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.CENTER_ALIGN;
		break;
	case 2: // Top Right
		tempAOS.anchorPoint = AnchorPoint.TOP_RIGHT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.TOP_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;
		break;
	case 3: // Middle Left
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.LEFT_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.CENTER_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.LEFT_ALIGN;
		break;
	case 4: // Center
		tempAOS.anchorPoint = AnchorPoint.CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.CENTER_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.CENTER_ALIGN;
		break;
	case 5: // Middle Right
		tempAOS.anchorPoint = AnchorPoint.RIGHT_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.CENTER_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;
		break;
	case 6: // Bottom Left
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.BOTTOM_LEFT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.BOTTOM_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.LEFT_ALIGN;
		break;
	case 7: // Bottom Center
		tempAOS.anchorPoint = AnchorPoint.BOTTOM_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.BOTTOM_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.CENTER_ALIGN;
		break;
	case 8: // Bottom Right
		tempAOS.anchorPoint = AnchorPoint.BOTTOM_RIGHT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.BOTTOM_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;
		break;
	// 9 == separator
	case 10: // Top Relative to Spine
		tempAOS.spineRelative = true;
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.TOP_RIGHT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.TOP_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;
		break;
	case 11: // Middle Relative to Spine
		tempAOS.spineRelative = true;
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.RIGHT_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.CENTER_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;			
		break;
	case 12: //  Bottom Relative to Spine
		tempAOS.spineRelative = true;
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.BOTTOM_RIGHT_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.BOTTOM_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.RIGHT_ALIGN;
		break;
	case 13: // Middle relative to Edge
		tempAOS.spineRelative = true;
		tempAOS.anchorXoffset *= -1;
		tempAOS.anchorPoint = AnchorPoint.LEFT_CENTER_ANCHOR;
		tempAOS.verticalAlignment = VerticalAlignment.CENTER_ALIGN;
		tempAOS.horizontalAlignment = HorizontalAlignment.LEFT_ALIGN;		
		break;
    } // switch

// Add the pages to the doc based on normal or mapping pages
app.doScript(addPagesAction, ScriptLanguage.javascript, undefined, UndoModes.entireScript, "addPagesAction");

// Kill the Object style
tempObjStyle.remove();

// Save prefs and then restore original app/doc settings
savePrefs(false);
restoreDefaults(true);

// THE END OF EXECUTION
exit();
//*********
function addPagesAction() { // addPagesAction
if (mapPages && noPDFError) { // && noPDFError
	for (pdfPG = startPG; pdfPG <= endPG; pdfPG++) { // for	
		i = ddArray[pdfPG%docPgCount].selection.text;
		if (i == m94) { continue;}
		addPages(Number(i), pdfPG, pdfPG); 
        } // for
    } // && noPDFError
else if (reverseOrder && noPDFError) {
	for (reverse = endPG; reverse >= startPG; reverse--) {
		addPages(docStartPG, reverse, reverse);
		docStartPG++;
        }
    }
else { addPages(docStartPG, startPG, endPG); }
} // addPagesAction
//***********
// Place the requested pages in the document
function addPages(docStartPG, startPG, endPG) { // addPages
	var currentPDFPg = 0;
	var firstTime = true;
	var addedAPage = false;
	var zeroBasedDocPgCnt = docPgCount - 1;

	for (i = docStartPG - 1, currentInputDocPg = startPG; currentInputDocPg <= endPG; currentInputDocPg++, i++) { //// i++

		if (placementINFO.kind == PDF_DOC) {
			// Set the app's PDF placement pref's page number property to the current PDF page number
			app.pdfPlacePreferences.pageNumber = currentInputDocPg;
            }
		else {
			// Set the app's Imported Page placement pref's page number property to the current IND page number
			app.importedPageAttributes.pageNumber = currentInputDocPg;
            }

		if (i > zeroBasedDocPgCnt) {
			// Make sure we have a page to insert into
			theDoc.pages.add(LocationOptions.AT_END);
			addedAPage = true;
            }
	
		// Create a temporary text box to place graphic in (to use auto positioning and sizing)
		var TB = theDoc.pages[i].textFrames.add({geometricBounds:[0,0,20,20]});
		//decrease the font size of the newly inserted box to 0 to avoid a very misleading "out of pasteboard" error
		//background: if the default font size of the ID document (set by default character style or default paragraph style) causes the text box to overflow it gives you an error saying ("This value would cause one or more objects to leave the pasteboard."). This mainly manifests in pixel based documents as the text box is only 20x20 px large in those cases.
		TB.texts.firstItem().pointSize=1;
		var theRect = TB.insertionPoints.firstItem().rectangles.add();
            theRect.label = "Multi_Page_Importer_Rect";
		// Applying the object style and doing a recompose updates some objects that 
		// the add method doesn't create in the rectangle object
		theRect.appliedObjectStyle = tempObjStyle;
		TB.recompose();
		
		// Place the current PDF/Ind page into the rectangle object
		try { // try
			var tempGraphic = theRect.place(theFile)[0];
			/* removed 6/25/08
			tempGraphic.graphicLayerOptions.updateLinkOption = (indUpdateType == 0) ?
																							  UpdateLinkOptions.APPLICATION_SETTINGS : 
																							  UpdateLinkOptions.KEEP_OVERRIDES;
			*/
		
			// If all pgs are being added, check that we aren't cruising to the first PDF page again
			if (!noPDFError && !firstTime && tempGraphic.pdfAttributes.pageNumber == 1) { // .pageNumber == 1
				// If a page was added, nuke it, it's a dupe of the first page
				if (addedAPage) { theDoc.pages[i].remove(); }
				else { TB.remove(); } // Just remove the placed graphic
				return;
                } //  .pageNumber == 1
            }  // try
		catch(e) { // catch
			if(e.description.indexOf("Failed to open") != -1 ) {
//				alert("\"" + fileName + "\" doesn't contain a \"" + cropStrings[cropType] + "\" crop type:\n\nPlease try again by selecting a different crop type or open\nthe PDF in Acrobat and perform a \"Save As...\" command.", "PDF Placement Error");
				alert("\"" + fileName + m25 + cropStrings[cropType] + m26, m27);                
                }
			else { alert(e); }
			if (placeOnLayer) { currentLayer.remove(); }
			else { TB.remove(); }
			restoreDefaults(true);
			// Kill the Object style
			tempObjStyle.remove();
			exit(-1);
            } // catch
	
		// Apply any rotation
		theRect.rotationAngle = rotateValues[rotate];

		// Fit to Page Option
		if (fitPage) { // fitPage
			if (addBleed) {
				// Make rectangle the size of the page size plus bleed
				theRect.geometricBounds = [
										   0 - theDoc.documentPreferences.documentBleedTopOffset,
										   0 - theDoc.documentPreferences.documentBleedInsideOrLeftOffset,
										   docHeight + theDoc.documentPreferences.documentBleedBottomOffset,
										   docWidth + theDoc.documentPreferences.documentBleedOutsideOrRightOffset];
                }
			else {
				// Change rectangle's size to the page size
				theRect.geometricBounds = [0, 0, docHeight, docWidth];
                }
		
			// Fit the placed page according to selected options
			if (keepProp) {
				theRect.fit(FitOptions.proportionally);
				theRect.fit(FitOptions.frameToContent);// Size box down to size of placed page
                }
			else { theRect.fit(FitOptions.contentToFrame); }
            } // fitPage
		// Use the Scaling Option
		else {
			// Apply the scaling
			theRect.allGraphics[0].verticalScale = percY;
			theRect.allGraphics[0].horizontalScale = percX;
			theRect.fit(FitOptions.frameToContent);
            }

		// Apply the Object Style to transform the graphic into an anchored item (allows auto positioning)
		theRect.appliedObjectStyle = tempObjStyle;
		
		// Force the text box to reformat itself in order to apply the Object Style
		TB.recompose();
		
		// Release the placed page from the text box and then delete the text box (clean up)
		theRect.anchoredObjectSettings.releaseAnchoredObject();
		TB.remove();
	
		firstTime = false;
	}  //// i++
} // addPages
//*********

// Create the main dialog box
function makeDialog() { // makeDialog
	dLog = new Window('dialog', m28 + placementINFO.kind + m29);       
    dLog.orientation = "column";     
    dLog.alignChildren = ["fill", "fill"];      
	dLog.onClose = ondLogClosed;
    var dlogRow1 = dLog.add("group");
    dlogRow1.orientation = "row";     
    dlogRow1.alignChildren = ["left", "top"]; 	
    var dlogRow2 = dLog.add("group");
    dlogRow2.orientation = "row";     
    dlogRow2.alignChildren = ["left", "top"];     
	/******************/
	/* Upper Left Panel */
	/******************/
	dlogRow1.pan1 = dlogRow1.add('panel', undefined, m30); 
    dlogRow1.pan1.alignChildren = ["left", "top"];       
     var groupStartEnd = dlogRow1.pan1.add("group");
     groupStartEnd.orientation = "row";
	 groupStartEnd.add('statictext', undefined, m31 + placementINFO.kind + m32);    

    var bottomMarginValue = 16; // Для сдвига нижней границы панели "Выбор страниц", выравнивая таким образом её высоту с правой панелью "Установки позиционирования". Выполняется только для случаев, когда PDF не распознан.
	if (noPDFError) { // noPDFError
        bottomMarginValue = 0;
		// Start pg
		dLog.startPG = groupStartEnd.add("edittext {justify: 'center'}", undefined);
         dLog.startPG.characters = 2;
         dLog.startPG.text = "1";
		dLog.startPG.onChange = startPGValidator;
		groupStartEnd.add('statictext', undefined, m33);         
		// End page
		dLog.endPG = groupStartEnd.add("edittext {justify: 'center'}", undefined);    
         dLog.endPG.characters = 3;
         dLog.endPG.text = placementINFO.pgCount;
		dLog.endPG.onChange = endPGValidator;
			
		// Mapping option
		dLog.mapPages = dlogRow1.pan1.add('checkbox', undefined, m34);        
		if (reverseOrder || docPgCount == 1) {
			mapPages = false;
			dLog.mapPages.enabled = false;
            }
		dLog.mapPages.value = mapPages;
		dLog.mapPages.onClick = mapPGValidator;		
		
		// Reverse order
		dLog.reverseOrder = dlogRow1.pan1.add('checkbox', undefined, m35);       
		if (mapPages) {
			// Both Mapping and reverse can't be checked
			reverseOrder = false;
			dLog.reverseOrder.enabled = false;
            }
		dLog.reverseOrder.value = reverseOrder;
		dLog.reverseOrder.onClick = reverseClicked;
	} // noPDFError
	else {
		dlogRow1.pan1.add('statictext', undefined, m36);
		dlogRow1.pan1.add('statictext', undefined, m37 + " " + m38);           
        }

	// Doc start page 
    var startPosition = dlogRow1.pan1.add("group");
    startPosition.orientation = "row";
    startPosition.margins.bottom = bottomMarginValue;   
	startPosition.add('statictext', undefined, m39);     
    dLog.docStartPG = startPosition.add("edittext {justify: 'center'}", undefined);
    dLog.docStartPG.characters = 3;
    dLog.docStartPG.text = "1";    
    dLog.docStartPG.onChange = docStartPGValidator; 
	
	/*************************/
	/* Upper Right Panel */
	/*************************/
	dlogRow1.pan3 = dlogRow1.add('panel', undefined, m45);   
    dlogRow1.pan3.alignChildren = ["left", "top"];       
	dlogRow1.pan3.add('statictext', undefined, m46);    

	// DropDownList
	dLog.posDropDown =  dlogRow1.pan3.add('dropdownlist', undefined, positionValuesAll);    
	dLog.posDropDown.add("separator"); 
	dLog.posDropDown.add("item", m47);
	dLog.posDropDown.add("item", m48);
	dLog.posDropDown.add("item", m49);    
	dLog.posDropDown.selection = positionType;

	// Rotation
    var rotateGroup = dlogRow1.pan3.add("group");
    rotateGroup.orientation = "row";
	rotateGroup.add('statictext', undefined, m50);    
	dLog.rotate = rotateGroup.add('dropdownlist', undefined);
	for (i=0;i<rotateValues.length;i++) { dLog.rotate.add('item', rotateValues[i]); }
	dLog.rotate.selection = rotate;
	
	// Offset section
    var shiftGroup = dlogRow1.pan3.add("group");
    shiftGroup.orientation = "row";
	shiftGroup.add('statictext', undefined, m51);    
	// X offset value
	shiftGroup.add('statictext', undefined, "X:");
	dLog_offsetX = shiftGroup.add("edittext {justify: 'center'}", undefined); 
    dLog_offsetX.text = offsetX;
    dLog_offsetX.characters = 4;
	dLog_offsetX.onChange = offsetXValidator;
	
	// Y offset value
	shiftGroup.add('statictext', undefined, "Y:");
	dLog_offsetY = shiftGroup.add("edittext {justify: 'center'}", undefined);     
    dLog_offsetY.text = offsetY;
    dLog_offsetY.characters = 4;    
	dLog_offsetY.onChange = offsetYValidator;    

	/***********************/
	/* Lower Left Panel */
	/***********************/    
	dlogRow2.pan2 = dlogRow2.add('panel', undefined, m40);      
    dlogRow2.pan2.alignChildren = ["left", "top"];   
	// BEGIN Fitting Section
	dLog.fitPage = dlogRow2.pan2.add('checkbox', undefined, m41);    
	dLog.fitPage.onClick = onFitPageClicked;
	dLog.fitPage.value = fitPage;

	// Checkbox
	dLog.keepProp = dlogRow2.pan2.add('checkbox', undefined, m42);    
	dLog.keepProp.value = keepProp;
	dLog.keepProp.enabled = dLog.fitPage.value;
	
	// Checkbox
	dLog.addBleed = dlogRow2.pan2.add('checkbox', undefined, m43);    
	dLog.addBleed.value = addBleed;
	dLog.addBleed.enabled = dLog.fitPage.value;
	// END Fitting Section

	// BEGIN Scaling section   
	dlogRow2.pan2.add('statictext',  undefined, m44);     

	// X%
    var xyProc = dlogRow2.pan2.add("group");
    xyProc.orientation = "row";
	xyProc.add('statictext', undefined, "X%:");
	dLog_percX = xyProc.add("edittext {justify: 'center'}", undefined); 
    dLog_percX.characters = 4;
	dLog_percX.text = percX;
	// Visibility depends on the Fit Page checkbox
	dLog_percX.enabled = !dLog.fitPage.value;
	// Assign a validator
	dLog_percX.onChange = percXValidator;

	// Y%
	xyProc.add('statictext', undefined, "Y%:");
	dLog_percY = xyProc.add("edittext {justify: 'center'}", undefined);    
    dLog_percY.characters = 4;    
	dLog_percY.text = percY;
	// Visibility depends on the Fit Page checkbox
	dLog_percY.enabled = !dLog.fitPage.value;
	// Assign a validator
	dLog_percY.onChange = percYValidator;


	/*************************/
	/* Lower Right Panel */
	/*************************/
    dlogRow2.pan4 = dlogRow2.add('panel', undefined, m52);      
    dlogRow2.pan4.alignChildren = ["left", "top"];   	
	// Add the crop type dropdown list and populate it
	dlogRow2.pan4.add('statictext', undefined, m53);    
	dLog.cropType = dlogRow2.pan4.add('dropdownlist', undefined);
	for (i=0; i<cropStrings.length; i++) {
		dLog.cropType.add('item', cropStrings[i]);
        }
	dLog.cropType.selection = (placementINFO.kind == PDF_DOC) ? pdfCropType : indCropType;

	// Place on Layer
	dLog.placeOnLayer = dlogRow2.pan4.add('checkbox', undefined, m54);    
	dLog.placeOnLayer.value = placeOnLayer;
	
	// Ignore errors
	dLog.ignoreErrors = dlogRow2.pan4.add('checkbox', undefined, m55);    
	dLog.ignoreErrors.value = ignoreErrors;
		
	// Transparent PDFs
	dLog.doTransparent = dlogRow2.pan4.add('checkbox', undefined, m56);    
	dLog.doTransparent.value = doTransparent;
	
	// Disable PDF options if needed
	if(placementINFO.kind != PDF_DOC) { dLog.doTransparent.enabled = false; }
	
	// The buttons
    var buttonGroup = dLog.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];  
    var buttonSize = [0,0,125,28];
	dLog.OKbut = buttonGroup.add('button', buttonSize, "OK");  
	dLog.OKbut.onClick = onOKclicked;
    var info = buttonGroup.add('button', [0,0,28,28], "?");
    info.onClick = info_onClicked;
	dLog.CANbut = buttonGroup.add('button', buttonSize, "Cancel");
	dLog.CANbut.onClick = onCANclicked;  
	return dLog;
} // makeDialog
//****************
// function to restore saved settings back to originals before script ran
// extras parameter is for exiting at different areas of script:
// false: prior to doing anything
// true: end of script or reading PDF file size
function restoreDefaults(extras) { // restoreDefaults
	try { app.scriptPreferences.userInteractionLevel = oldInteractionPref; } catch (e) { }
	if(extras == true) {
		theDoc.zeroPoint = oldZero;
		theDoc.viewPreferences.rulerOrigin = oldRulerOrigin;
        }
} // restoreDefaults
//*****
// function to read prefs from a file
function readPrefs() { // readPrefs
	if (usePrefs) { // usePrefs
		try {
			prefsFile.open("r");
			pdfCropType = Number(prefsFile.readln() );
			positionType = Number(prefsFile.readln() );
			offsetX = Number(prefsFile.readln() );
			offsetY = Number(prefsFile.readln() );
			doTransparent = Number(prefsFile.readln() );
			placeOnLayer = Number(prefsFile.readln() );
			fitPage = Number(prefsFile.readln() );
			keepProp = Number(prefsFile.readln() );
			addBleed = Number(prefsFile.readln() );
			ignoreErrors = Number(prefsFile.readln() );
			percX = Number(prefsFile.readln() );
			percY = Number(prefsFile.readln() );
			indCropType = Number(prefsFile.readln() );
			mapPages = Number(prefsFile.readln() );// added 9/7/08
             mapPages = 0; // 14.08.2023 - установка пользователем  этого флажка запустит процедуру mapPGValidator, а если флажок установлен при загрузке программы, то эта процедура пропускается            
			reverseOrder = Number(prefsFile.readln() ); // added 1/17/09
			rotate = Number(prefsFile.readln()); // added 3/6/09
			prefsFile.close();
            }
		catch(e) {
			throwError(m57 + e, false, 2, prefsFile);            
            }
	} // usePrefs
} // readPrefs
//**************
// function to save prefs to a file
function savePrefs(firstRun) { // savePrefs
	if (usePrefs) { // usePrefs
		try {
			var newPrefs =
			((!firstRun && placementINFO.kind == PDF_DOC) ? cropType: pdfCropType) + "\n" +
			positionType + "\n" +
			offsetX + "\n" +
			offsetY + "\n" +
			((doTransparent)?1:0) + "\n" +
			((placeOnLayer)?1:0) + "\n" +
			((fitPage)?1:0) + "\n" +
			((keepProp)?1:0) + "\n" +
			((addBleed)?1:0) + "\n" +
			((ignoreErrors)?1:0) + "\n" +
			percX + "\n" +
			percY + "\n" +
			((!firstRun && placementINFO.kind == IND_DOC) ? cropType : indCropType) + "\n" +
			((mapPages)?1:0) + "\n" + /* added 9/7/08 */
			((reverseOrder)?1:0) + "\n" +/* added 1/17/09 */
			rotate; /* added 3/6/09 */
			prefsFile.open("w");
			prefsFile.write(newPrefs);
			prefsFile.close();
            }
		catch(e) {
			throwError(m58 + e, false, 2, prefsFile);            
            }
        } // usePrefs
}  // savePrefs

/*********************************************/
/*                                                                */
/*        PDF READER SECTION           */
/*  Extracts count and size of pages    */
/*                                                                */
/********************************************/

// Extract info from the PDF file.
// getSize is a boolean that will also determine page size and rotation of first page
// *** File position changes in this function. ***
// Results are as follows:
// page count = retArray.pgCount
// page width = retArray.pgSize.pgWidth
// page height = retArray.pgSize.pgHeight
function getPDFInfo(theFile, getSize) { // getPDFInfo
	var flag = 0; // used to keep track if the %EOF line was encountered
	var nlCount = 0; // number of newline characters per line (1 or 2)

	// The array to hold return values
	var retArray = new Array();
	retArray["pgCount"] = -1;
	retArray["pgSize"] = null;

	// Open the PDF file for reading
	theFile.open("r");

	// Search for %EOF line
	// This skips any garbage at the end of the file
	// if FOE% is encountered (%EOF read backwards), flag will be 15
	for (i=0; flag != 15; i++) { // I++
		theFile.seek(i,2);
		switch (theFile.readch()) {
			case "F":
				flag|=1;
				break;
			case "O":
				flag|=2;
				break;
			case "E":
				flag|=4;
				break;
			case "%":
				flag|=8;
				break;
			default:
				flag=0;
				break;
            }
        }  // I++
	// Jump back a small distance to allow going forward more easily
	theFile.seek(theFile.tell()-100);

	// Read until startxref section is reached
	while(theFile.readln() != "startxref");

	// Set the position of the first xref section
	var xrefPos = parseInt(theFile.readln(), 10);

	// The array for all the xref sections
	var	xrefArray = new Array();

	// Go to the xref section
	theFile.seek(xrefPos);

	// Determine length of xref entries
	// (not all PDFs are compliant with the requirement of 20 char/entry)
	xrefArray["lineLen"] = determineLineLen(theFile);

	// Get all the xref sections
	while (xrefPos != -1) { // while
		// Go to next section
		theFile.seek(xrefPos);

		// Make sure it's an xref line we went to, otherwise PDF is no good
		if (theFile.readln() != "xref") { throwError(m59, true, 99, theFile); }

		// Add the current xref section into the main array
		xrefArray[xrefArray.length] = makeXrefEntry(theFile, xrefArray.lineLen);

		// See if there are any more xref sections
		xrefPos = xrefArray[xrefArray.length-1].prevXref;
        } // while

	// Go get the location of the /Catalog section (the /Root obj)
	var objRef = -1;
	for (i=0; i < xrefArray.length; i++) { /// i++
		objRef = xrefArray[i].rootObj;
		if (objRef != -1) { i = xrefArray.length; }
        } /// i++

	// Double check root obj was found
	if(objRef == -1) {
		throwError(m60, true, 98, theFile);        
        }

	// Get the offset of the root section and set file position to it
	var theOffset = getByteOffset(objRef, xrefArray);
	theFile.seek(theOffset);

	// Determine the obj where the first page is located
	objRef = getRootPageNode(theFile);

	// Get the offset where the root page nod is located and set the file position to it
	theOffset = getByteOffset(objRef, xrefArray);
	theFile.seek(theOffset);

	// Get the page count info from the root page tree node section
	retArray.pgCount = readPageCount(theFile);

	// Does user need size also? If so, get size info
	if (getSize) { // getSize
		// Go back to root page tree node
		theFile.seek(theOffset);

		// Flag to tell if page tree root was visited already
		var rootFlag = false;

		// Loop until an actual page obj is found (page tree leaf)
		do { // do
			var getOut = true;

			if (rootFlag) { // rootFlag
				// Try to find the line with the /Kids entry
				// Also look for instance when MediBox is in the root obj
				do {
					var tempLine = theFile.readln();
                    }
                while (tempLine.indexOf("/Kids") == -1 && tempLine.indexOf(">>") == -1);
			} // rootFlag
			else { /// else				
				// Try to first find the line with the /MediaBox entry
				rootFlag = true; // Indicate root page tree was visited
				getOut = false; // Force loop if /MediaBox isn't found here
				do { 
					var tempLine = theFile.readln();
					if( tempLine.indexOf("/MediaBox") != -1) {
						getOut = true;
						break;
                        }
                    }
                while(tempLine.indexOf(">>") == -1);

				if (!getOut) {
					// Reset the file pointer to the beginning of the root obj again
					theFile.seek(theOffset)
                    }
			} /// else

			// If /Kids entry was found, still at an internal page tree node
			if (tempLine.indexOf("/Kids") != -1) { // "/Kids"
				// Check if the array is on the same line
				if(tempLine.indexOf("R") != -1) {
					// Grab the obj ref for the first page
					objRef = parseInt(tempLine.split("/Kids")[1].split("[")[1]);
                    }
				else { ////- else
					// Go down one line
					tempLine = theFile.readln();

					// Check if the opening bracket is on this line
					if (tempLine.indexOf("[") != -1) {
						// Grab the obj ref for the first page
						objRef = parseInt(tempLine.split("[")[1]);
                        }
					else {
						// Grab the obj ref for the first page
						objRef = parseInt(tempLine);
                        }
				}  ////- else

				// Get the file offset for the page obj and set file pos to it
				theOffset = getByteOffset(objRef, xrefArray);
				theFile.seek(theOffset);
				getOut = false;
			} // "/Kids"
		} // do
    while (!getOut); 

		// Make sure file position is correct if finally at a leaf
		theFile.seek(theOffset);

		// Go get the page sizes
		retArray.pgSize = getPageSize(theFile);
	}  // getSize

	// Close the PDF file, finally all done!
	theFile.close();

	return retArray;
} // getPDFInfo
//****************
// Function to create an array of xref info
// File position must be set to second line of xref section
// *** File position changes in this function. ***
function makeXrefEntry (theFile, lineLen) { // makeXrefEntry
	var newEntry = new Array();
	newEntry["theSects"] = new Array();
	var tempLine = theFile.readln();

	// Save info
	newEntry.theSects[0] = makeXrefSection(tempLine, theFile.tell());

	// Try to get to trailer line
	var xrefSec = newEntry.theSects[newEntry.theSects.length-1].refPos;
	var numObjs = newEntry.theSects[newEntry.theSects.length-1].numObjs;
	do {
		var getOut = true;
		for (i=0; i<numObjs;i++) {
			theFile.readln(); // get past the objects: tell( ) method is all screwed up in CS4
            }
		tempLine = theFile.readln();
		if (tempLine.indexOf("trailer") == -1) { 
			// Found another xref section, create an entry for it
			var tempArray = makeXrefSection(tempLine, theFile.tell());
			newEntry.theSects[newEntry.theSects.length] = tempArray;
			xrefSec = tempArray.refPos;
			numObjs = tempArray.numObjs;
			getOut = false;
            }
        }
    while(!getOut);

	// Read line with trailer dict info in it
	// Need to get /Root object ref
	newEntry["rootObj"] = -1;
	newEntry["prevXref"] = -1;
	do {
		tempLine = theFile.readln();
		if (tempLine.indexOf("/Root") != -1) {			
			// Extract the obj location where the root of the page tree is located:
			newEntry.rootObj = parseInt(tempLine.substring(tempLine.indexOf("/Root") + 5), 10);
            }
		if (tempLine.indexOf("/Prev") != -1) {
			newEntry.prevXref = parseInt(tempLine.substring(tempLine.indexOf("/Prev") + 5), 10);
            }
        }
    while(tempLine.indexOf(">>") == -1);

	return newEntry;
} // makeXrefEntry
//*******
// Function to save xref info to a given array
function makeXrefSection(theLine, thePos) { // makeXrefSection
	var tempArray = new Array();
	var temp = theLine.split(" ");
	tempArray["startObj"] = parseInt(temp[0], 10);
	tempArray["numObjs"] = parseInt(temp[1], 10);
	tempArray["refPos"] = thePos;
	return tempArray;
}  // makeXrefSection
//*****
// Function that gets the page count form a root page section
// *** File position changes in this function. ***
function readPageCount (theFile) { // readPageCount
	// Read in first line of section
	var theLine = theFile.readln();

	// Locate the line containing the /Count entry
	while(theLine.indexOf("/Count") == -1) { theLine = theFile.readln(); }

	// Extract the page count
	return parseInt(theLine.substring(theLine.indexOf("/Count") +6), 10);
} // readPageCount
//********************
// Function to determine length of xref entries
// Not all PDFs conform to the 20 char/entry requirement
// *** File position changes in this function. ***
function determineLineLen(theFile) { // determineLineLen
// Skip xref line
theFile.readln();
var lineLen = -1;

// Loop trying to find lineLen
do { // do
    var getOut = true;
     var tempLine = theFile.readln();
    if(tempLine != "trailer") { // "trailer"
        // Get the number of object enteries in this section
        var numObj = parseInt(tempLine.split(" ")[1]);

        // If there is more than one entry in this section, use them to determime lineLen
        if(numObj > 1) {
            theFile.readln();
            var tempPos = theFile.tell();
            theFile.readln();
            lineLen = theFile.tell() - tempPos;
            }
        else {
            if (numObj == 1) {
                // Skip the single entry
                theFile.readln();
                }
            getOut = false;
            }
        } // "trailer"
    else { // else
        // Read next line(s) and extract previous xref section
        var getOut = false;
        do {
            tempLine = theFile.readln();
            if (tempLine.indexOf("/Prev") != -1) {
                theFile.seek(parseInt(tempLine.substring(tempLine.indexOf("/Prev") + 5)));
                getOut = true;
                }
            }
        while(tempLine.indexOf(">>") == -1 && !getOut);
        theFile.readln(); // Skip the xref line
        getOut = false;
    }  // else
}  // do
while(!getOut);

// Check if there was a problem determining the line length
if (lineLen == -1) {
    throwError(m61, true, 97, theFile);        
    }
return lineLen;
} // determineLineLen
//**********
// Function that determines the byte offset of an object number
// Searches the built array of xref sections and reads the offset for theObj
// *** File position changes in this function. ***
function getByteOffset(theObj, xrefArray) { // getByteOffset
var theOffset = -1;
// Look for the theObj in all sections found previously
for (i = 0; i < xrefArray.length; i++) { // i++
var tempArray = xrefArray[i];
for (j=0; j < tempArray.theSects.length; j++) { // j++
     var tempArray2 = tempArray.theSects[j];

    // See if theObj falls within this section
    if (tempArray2.startObj <= theObj && theObj <= tempArray2.startObj + tempArray2.numObjs -1) { // if
        theFile.seek((tempArray2.refPos + ((theObj - tempArray2.startObj) * xrefArray.lineLen)));

        // Get the location of the obj
        var tempLine = theFile.readln();

        // Check if this is an old obj, if so ignore it
        // An xref entry with n is live, with f is not
        if (tempLine.indexOf("n") != -1) { //  != -1
            theOffset = parseInt(tempLine, 10);
            // Cleanly get out of both loops
            j = tempArray.theSects.length;
            i = xrefArray.length;
            }  // != -1
        } // if
    }  // j++
}  // i++
return theOffset;
} // getByteOffset
//****
// Function to extract the root page node object from a section
// File position must be at the start of the root page node
// *** File position changes in this function. ***
function getRootPageNode (theFile) { // getRootPageNode
	var tempLine = theFile.readln();
	// Go to line with /Page token in it
	while (tempLine.indexOf("/Pages") == -1) { tempLine = theFile.readln(); }
	// Extract the root page obj number
	return parseInt(tempLine.substring(tempLine.indexOf("/Pages") + 6), 10);
} // getRootPageNode
//************
// Function to extract the sizes from a page reference section
// File position must be at the start of the page object
// *** File position changes in this function. ***
function getPageSize (theFile) { // getPageSize
var hasTrimBox = false; // Prevent MediaBox from overwriting TrimBox info
var charOffset = -1;
var isRotated = false; // Page rotated 90 or 270 degrees?
var foundSize = false; // Was a size found?
do { // do
    var theLine = theFile.readln();
    if (!hasTrimBox && (charOffset = theLine.indexOf("/MediaBox")) != -1) { // "/MediaBox"
        // Is the array on the same line?
        if (theLine.indexOf("[", charOffset + 9) == -1) {
            // Need to go down one line to find the array
            theLine = theFile.readln();
            // Extract the values of the MediaBox array (x1, y1, x2, y2)
            var theNums = theLine.split("[")[1].split("]")[0].split(" ");
            }
        else {
            // Extract the values of the MediaBox array (x1, y1, x2, y2)
            var theNums = theLine.split("/MediaBox")[1].split("[")[1].split("]")[0].split(" ");
            }

        // Take care of leading space
        if (theNums[0] == "") { theNums = theNums.slice(1); }
        foundSize = true;
        } // "/MediaBox"
    if ((charOffset = theLine.indexOf("/TrimBox")) != -1) { // "/TrimBox"
        // Is the array on the same line?
        if (theLine.indexOf("[", charOffset + 8) == -1) {
            // Need to go down one line to find the array
            theLine = theFile.readln();
            // Extract the values of the MediaBox array (x1, y1, x2, y2)
            var theNums = theLine.split("[")[1].split("]")[0].split(" ");
            }
        else {
            // Extract the values of the MediaBox array (x1, y1, x2, y2)
            var theNums = theLine.split("/TrimBox")[1].split("[")[1].split("]")[0].split(" ");
            }
        // Prevent MediaBox overwriting TrimBox values
        hasTrimBox = true;
        // Take care of leading space
        if (theNums[0] == "") {
            theNums = theNums.slice(1);
            }
        foundSize = true;
        } // "/TrimBox"
    if ((charOffset = theLine.indexOf("/Rotate") ) != 1) { // "/Rotate"
        var rotVal = parseInt(theLine.substring(charOffset + 7));
        if (rotVal == 90 || rotVal == 270) { isRotated = true; }
        } // "/Rotate"
    }  // do
while (theLine.indexOf(">>") == -1);

// Check if a size array wasn't found
if (!foundSize) { throwError( m62, true, 96, theFile); }

// Do the math
var xSize = parseFloat(theNums[2]) - parseFloat(theNums[0]);
var ySize = parseFloat(theNums[3]) - parseFloat(theNums[1]);

// One last check that sizes are actually numbers
if (isNaN(xSize) || isNaN(ySize)) { throwError(m63, true, 95, theFile); }

// Use rotation to determine orientation of pages
var ret = new Array();
ret["width"] = isRotated ? ySize : xSize;
ret["height"] = isRotated ? xSize : ySize;

return ret;
} // getPageSize
//**********
// Error function
function throwError (msg, pdfError, idNum, fileToClose) { // throwError	
	if (fileToClose != null) { fileToClose.close(); }
	if (pdfError) {
		// Throw err to be able to turn page numbering off
		throw Error(m64);          
	 }
	else {
		alert(m65 + msg + " (" + idNum + ")", m66);        
		exit(idNum);
        }
} // throwError
//**********
// Extract info from the document being placed
// Need to open without showing window and then close it
// right after collecting the info
function getINDinfo (theDoc) { // getINDinfo
// Open it
var temp = app.open(theDoc, false);
var placementINFO = new Array();
var pgSize = new Array();
// Get info as needed
placementINFO["pgCount"] = temp.pages.length;
pgSize["height"] = temp.documentPreferences.pageHeight;
pgSize["width"] = temp.documentPreferences.pageWidth;
placementINFO["vUnits"] = temp.viewPreferences.verticalMeasurementUnits;
placementINFO["hUnits"] = temp.viewPreferences.horizontalMeasurementUnits;
placementINFO["pgSize"] = pgSize;
// Close the document
temp.close(SaveOptions.NO);
return placementINFO;
} // getINDinfo
//*******
// File filter for the mac to only show indy and pdf files
function macFileFilter (fileToTest) { // macFileFilter 
if (fileToTest.name.indexOf(".pdf") > -1 || fileToTest.name.indexOf(".ai") > -1 || fileToTest.name.indexOf(".ind") > -1)
    return true; 		 
else
    return false;	 
} // macFileFilter 
//*********
/* HELPER FUNCTIONS FOR THE DIALOG WINDOW */
	
// Enable/disable Keep Props, Bleed Fit, Scale boxes and Offset boxes when Fit Page is un/checked
function onFitPageClicked() { // onFitPageClicked
	dLog.keepProp.enabled = dLog.fitPage.value;
	dLog.addBleed.enabled = dLog.fitPage.value;
	dLog_percX.enabled = !dLog.fitPage.value;
	dLog_percY.enabled = !dLog.fitPage.value;
}  // onFitPageClicked
//**********
// Take care of OK beng clicked
function onOKclicked() {
	dLog.close(1);
}
//******
// Take care of Cancel beng clicked
function onCANclicked() {
	dLog.close(0);
}
//***************
function info_onClicked () { // info.onClick
app.pdfExportPreferences.properties.viewPDF = true;   
var myScriptFile = myGetScriptPath();
var pdfName = m91;
var myScriptFolder = decodeURI(myScriptFile.path);  
var infoFile = File(decodeURI(myScriptFolder + "/Info/" + pdfName)); 
if (!infoFile.exists) { 
    alert(m92 + pdfName + m93,programTitul);
    return; 
    }
else {
        infoFile.execute();
    }
} // info.onClick
//*******
// Validate the start page
function startPGValidator() { pageValidator(dLog.startPG, placementINFO.pgCount, "начальный"); }
//*****
// Validate the end page
function endPGValidator() {pageValidator(dLog.endPG, placementINFO.pgCount, "конечный"); }
//****
// Validate the document start page
function docStartPGValidator() { pageValidator(dLog.docStartPG, docPgCount, m67); }
//****
// Actual page validator
function pageValidator(me, max, boxType) { // pageValidator
	errType = m68;    
	temp = new Number(me.text);
	if (isNaN(temp)) {
		alert(m69 + boxType + m70, errType);        
		me.text = "1";
        }   
	else if (temp < 1) {
		alert(m71 + boxType + m72, errType);        
		me.text = "1";
        }
	else if (temp > max) {
		//alert(m71 + boxType + m73 + max + m74, errType);  
		alert(m74a, errType);           
		me.text = max;
        }
	// Make sure the new page range doesn't circumvent the mapPGValidator
	if (noPDFError) {
		mapPGValidator();
        }
} // pageValidator
//*****
// Validate entered text for the percX box
function percXValidator() {
	percentageValidator(dLog_percX, "X");
}
//*********
// Validate entered text for the percY box
function percYValidator() {
	percentageValidator(dLog_percY, "Y");
}
//********
// Validator for the percentage boxes
function percentageValidator(me, boxType) { // percentageValidator
	temp = new Number(me.text);
	if (isNaN(temp)) {
		alert(m75 + boxType + m76, m77);        
		me.text = "100";
        }
	else if(temp < 1 || temp > 400) {
		alert(m78 + boxType + m76, m77);        
		me.text = "100";
        }
} // percentageValidator
//*********
// Validate entered text for the X offset box
function offsetXValidator() { offsetValidator(dLog_offsetX, "X"); }
//******
// Validate entered text for the Y offset box
function offsetYValidator() { offsetValidator(dLog_offsetY, "Y"); }
//*****
// Actaul Validator for the offset values
function offsetValidator(me, boxType) { // offsetValidator
	if (isNaN(new Number(me.text))) {
		alert(m79 + boxType + m80, m81);        
		me.text="0";
        }
} // offsetValidator
//*****
// On dialog close Validator
function ondLogClosed() { // ondLogClosed
if (noPDFError && Number(dLog.startPG.text) > Number(dLog.endPG.text)) {
    alert(m82, m68);        
    return false;
    }
} // ondLogClosed
//******
// File filter for the mac to only show indy and pdf files
// The test for the constructor name came from Dave Suanders: http://jsid.blogspot.com/2006_03_01_archive.html
function macFileFilter(fileToTest) { // macFileFilter
	if ((fileToTest.name.indexOf(".pdf") != -1 || fileToTest.name.indexOf(".indd") != -1 || fileToTest.name.indexOf(".ai") != -1 || 
	     fileToTest.constructor.name == "Folder" || fileToTest.name == "") && fileToTest.name.indexOf(".app") == -1)
		return true; 		 
	else
		return false;	 
} // macFileFilter
//*********
// When reverseOrder checkbox is clicked, enable/disable the mapping checkbox
function reverseClicked() { // reverseClicked
	var setValue = true;
	if (dLog.reverseOrder.value) { setValue = false; }
	dLog.mapPages.enabled = setValue && docPgCount != 1;
} // reverseClicked

/*********************************************/
/*                                                                       */
/*        MAPPING SECTION                          */
/*                                                                       */
/********************************************/

// Create the mapping dialog box
function createMappingDialog(pdfStart, pdfEnd, numArray) { // createMappingDialog
	var maxCellsInRow = 8;
	var numDone=0;
	var currentPage = pdfStart;
	var numPDFPages = (pdfEnd - pdfStart)+1;
	var temp;
	
	mapDlog =  new Window('dialog', m83);
	mapDlog.add("statictext", [10,15,380,35], m84 + placementINFO.kind + m85 + placementINFO.kind + m86);    

	// Dynamically create controls
	while (numDone < numPDFPages) { // while 1
		numCells = 0;
		while (numCells < maxCellsInRow && numDone < numPDFPages) {  // while 2
			addW = (numCells*100);
			addH = (Math.floor(numDone/maxCellsInRow)*30);
			mapDlog.add("statictext", [10 +addW, 45 + addH, 45+addW, 65+addH], formatPgNum(currentPage) );
			temp = mapDlog.add("dropdownlist", [50 +addW, 40 + addH, 100+addW, 60+addH],null,{items:numArray});
			temp.selection = ddIndexArray[currentPage%docPgCount];
			ddArray[currentPage%docPgCount] = temp;
			numCells++;
			numDone++;
			currentPage++;
		}  // while 2
	}  // while 1

	// Resize dialog window according to the number of cells
	if (numPDFPages < 4) mapDlogW = 400;
	else if (numPDFPages < maxCellsInRow) mapDlogW = 10 + numPDFPages * 100;
	else mapDlogW = 10 + maxCellsInRow * 100;
	mapDlogH = (Math.ceil(numPDFPages/maxCellsInRow) * 30) + 80;

	mapDlog.OKbut = mapDlog.add('button',  [mapDlogW - 140, mapDlogH - 35, mapDlogW - 80 , mapDlogH - 10], "OK");    
	mapDlog.OKbut.onClick = onMapOKclicked; 
	mapDlog.CANbut = mapDlog.add('button', [mapDlogW - 70, mapDlogH - 35, mapDlogW - 10 , mapDlogH - 10], "Cancel");    
	mapDlog.CANbut.onClick = onMapCANclicked;
	mapDlog.onClose = onMapClose;

	mapDlog.bounds = [0,0, mapDlogW, mapDlogH];
	return mapDlog;
} // createMappingDialog
//*********
function onMapOKclicked() { mapDlog.close(); }
///
function onMapCANclicked() { // onMapCANclicked
doMapCheck = false;
restoreDefaults(false);
exit();
} // onMapCANclicked
//*********
// Test the given input for duplicates. 
function onMapClose() { // onMapClose()
	var result = true;
	if (doMapCheck) { // doMapCheck
		var trackerArray = new Array(docPgCount);
		// Xref the ddIndexArray to the ddArray selected index
		for (i = startPG; i <= endPG; i++) { // i++
			var thisPop = ddArray[i%docPgCount];
			var popSelect = thisPop.selection.index;
			if (popSelect != 0) { // popSelect != 0
				if(trackerArray[popSelect]) {
					result = false;
					thisPop.graphics.backgroundColor = thisPop.graphics.newBrush(thisPop.graphics.BrushType.SOLID_COLOR,[1,0,0]);
                    }
				else {
					trackerArray[popSelect] = true;
					thisPop.graphics.backgroundColor = thisPop.graphics.newBrush(thisPop.graphics.BrushType.SOLID_COLOR,[1,1,1]);
                    }
                } // popSelect != 0
			ddIndexArray[i%docPgCount] = popSelect;
		} // i++

		if (!result) { alert(m87, m88); }         
	} // doMapCheck
return result;
} // onMapClose()
//**********
////
// Format the given page number to include an "arrow" so as to make
// the page number 5 characters long. Used in the mapping dialog box.
function formatPgNum(current) { // formatPgNum	
	if(current<10)
		arrow = "--->";
	else if (current < 100)
		arrow = "-->";
	else
		arrow = "->";
	return current + arrow;
}  // formatPgNum
//*****
// Validate that selected PDF page range can all be mapped to separate pages
function mapPGValidator() { // mapPGValidator
	if (dLog.mapPages.value) { // dLog.mapPages.value         
		if ((Number(dLog.endPG.text) - Number(dLog.startPG.text))+1 > docPgCount) { // dLog.endPG.text
			alert(m89, m90);            
			dLog.mapPages.value = false;
            } // dLog.endPG.text
		else { dLog.reverseOrder.enabled = false; }
        } // dLog.mapPages.value
	else {
		// Unchecked, enable reverseOrder checkbox
		dLog.reverseOrder.enabled = true;
        }
} // mapPGValidator
