//Скрипт предназначен для открытия в Adobe Photoshop растровых файлов, помещенных в публикацию Adobe InDesign.
//Опционально возможен запуск одного из экшенов для обработки файлов, а также закрытие файлов после обработки.

//Версия 1.7 доработана под CS4. 
//Добавлена функция автоматического приведения разрешения изображений к 300 dpi в фотошопе (для изображений с эфф.разрешением менее 260 dpi или более 350 dpi)
//Добавлена функция Merge Visible Layers
//Добавлена функция cохранения PSD копии оригинала изображения

//Версия 2.0 доработана:
//В диалоговом окне можно ввести разрешение к которому приводить изображения
//В диалоговом окне можно ввести ActionSet и ActionName для автоматической обработки в Photoshop
//Запоминаются последние настройки диалогового окна
//Исправлена ошибка с неправильным изменением разрешения у непропорционально отмасштабированных изображений.

//АВТОР СКРИПТА: Олег Бутрин (http://indesign.rudtp.ru)
//ДОРАБОТКА СКРИПТА: Леонид Пивнюк (Leo3001@mail.ru)
//ДАТА НАПИСАНИЯ: 05.02.2006
//ДАТА ПОСЛЕДНЕЙ ДОРАБОТКИ: 5.09.2013

#target indesign
 
//Заголовочная часть - определение переменных диалога
var langAlertNoDoc = localize({en: "No documents are open!", ru: "Нет открытых документов!"});
var langAlertPhotoshopNotStarted = localize({en: "Photoshop not started!", ru: "Невозможно запустить Photoshop!"});
var langAlertNoImages = localize({en: "Can\'t find normal link!", ru: "Невозможно найти обновленные связи!"});

var langDialogImagesFrom = localize({en: "Images from:", ru: "Картинки из:"});
var langDialogDocument = localize({en: "document", ru: "документа"});
var langDialogSpread = localize({en: "spread", ru: "разворота"});
var langDialogPage = localize({en: "page", ru: "страницы"});
var langDialogSelection = localize({en: "selection", ru: "выделенного"});
var langDialogResize = localize({en: "Resize", ru: "Менять размер"});
var langDialogMerge = localize({en: "Merge Visible Layers", ru: "Слить видимые слои"});
var langDialogCopy = localize({en: "Save PSD copy", ru: "Сохранять PSD копию"});
var langDialogRunAction = localize({en: "Run Action", ru: "Запустить Action"});
var langDialogCloseAfterAction = localize({en: "Close after Action", ru: "Закрыть после выполнения"});

var isCS = Number(String(app.version).split('.')[0]) < 4;


//Для изменения экшена отредактируй нижеследующие определения
var iniActionSet = "Default Actions";
var iniActionName = "CMYK-Save";


// prefs constructor
function Prefs()
{
	// default values
	this.scriptName = "Open Files In PhotoShop";
	var scriptVersion = 2;
	var scriptCompatibleVersion = 2;
	this.RegionDoc = false;
	this.RegionSpread = false;
	this.RegionPage = true;
	this.selectedResize = true;
	this.imageResDpi = "300";
	this.selectedMerge = true;
	this.selectedCopy = true;
	this.selectedAction = false;
	this.ActionSet = "";
	this.ActionName = "";
	this.selectedCloseAfter = false;
	
	// file for save preferences
	// Folder.userData - undefined in CS
	var fileName = (isCS ? Folder.temp : Folder.userData) + '/' + this.scriptName + ' ' + scriptVersion + '.prefs';
	var file = File(fileName);
	
	// reading
	if (file.exists)
	{
		try
		{
			file.open("r"); // open preferences file
			var data = file.read(9999);
			file.close();
			// read values
			data = eval(data);
			// проверяем версию
			if (this.scriptName == data.scriptName 
					&& Number(scriptCompatibleVersion) <= Number(data.scriptVersion))
					// обновляем значения
					for (var i in this) this[i] = data[i];
					
		}
		catch(e)
		{
			file.close();
			file.remove();
		}
	}
	this.scriptVersion = scriptVersion;
	
	// save preferences
	this.save = function()
	{
		var savedObject = {};
		for (var i in this)
		{
			switch (this[i].constructor.name.toLowerCase())
			{
				case 'function': 
					continue; // програмный код не сохраняем
				
				case 'file':	// для этих объектов
				case 'folder':	// сохраняем только путь
					savedObject[i] = this[i].absoluteURI;
					break;
					
				default:
					savedObject[i] = this[i];
			}
		}
		
		// сохраняем файл настроек
		file.open("w");
		file.write(savedObject.toSource());
		file.close();
	}
}
var prefs = new Prefs();


//Функция получения картинок из указанного массива объектов
function getSelectedImages(myArray) {
	var myResult = new Array();
	for (var myCounter = 0; myCounter < myArray.length; myCounter++) {
		var myObject = myArray[myCounter];
		if (myObject.constructor.name == "Image") {
			myResult.push(myObject);
		} else {
			for (var objCounter = 0; objCounter < myObject.allGraphics.length; objCounter++) {
				if (myObject.allGraphics[objCounter].constructor.name == "Image") {
					myResult.push(myObject.allGraphics[objCounter]);
				}
			}
		}
	}
	return myResult;
}

//Функция поиска дублирующихся файлов в массиве 
function checkDoubledFile(myArray, myObject) {
	for (var objCounter = 0; objCounter < myArray.length; objCounter++) {
		if (myObject.itemLink.filePath == myArray[objCounter].itemLink.filePath) {
			return true;
		}
	}
	return false;
}

//Функция получения списка неповторяющихся файлов 
function getUniqImages(myArray) {
	var myResult = new Array();
	for (var myCounter = 0; myCounter < myArray.length; myCounter++) {
		var myObject = myArray[myCounter];
		if (!checkDoubledFile(myResult, myObject)) {
			myResult.push(myObject);
		}
	}
	return myResult;
}
//Функция отсеивания необновленных и отсутствующих файлов
function removeMissingFile(myArray) {
	var myResult = new Array();
	for (var myCounter = 0; myCounter < myArray.length; myCounter++) {
		if (myArray[myCounter].itemLink.status == LinkStatus.normal)  {
			myResult.push(myArray[myCounter]);
		}
	}
	return myResult;
}
//Функция получения полного пути к файлу
function getImagePath(myArray) {
	var myResult = new Array();
	var myFile
	var myOpenFile
	for (var myCounter = 0; myCounter < myArray.length; myCounter++) {
		myFile = File(myArray[myCounter].itemLink.filePath);
		myOpenFile = myFile.path + "/" +myFile.name;
		myResult.push(myOpenFile);
	}
	return myResult;
}
//Функция запуска приложения с использованием функций BrigeTalk (подробно об использовании Bridge Talk смотри в описании Bridge Scripting)
function executeTarget (appSpec) {
	try {
//		если приложение уже запущено, передаем ему фокус
		if (BridgeTalk.isRunning(appSpec)) {
			BridgeTalk.bringToFront (appSpec);
		} else {
//			если приложение не запущено, запускаем его и передаем фокус
			BridgeTalk.launch (appSpec);
			BridgeTalk.bringToFront (appSpec);
		}
		return true;
	} catch (error) {
		return false;
	}
}

with (app) {
//Получаем активный документ
	try {
		var myDoc = activeDocument;
	} catch (error) {
		alert(langAlertNoDoc);
		exit();
	}
//	Делаем выборку файлов из выделенных объектов и проводим отсеивание
	var myFiles = getSelectedImages(selection);
	myFiles = getUniqImages(myFiles);
	myFiles = removeMissingFile(myFiles);
//	Создаем и запускаем диалог
	var myDialog = dialogs.add({name: prefs.scriptName + " " + prefs.scriptVersion});
	with (myDialog.dialogColumns.add()) 
		{
		with (borderPanels.add().dialogColumns.add()) 
			{
			dialogRows.add().staticTexts.add({staticLabel:langDialogImagesFrom});
			var selectedRegion = dialogRows.add().radiobuttonGroups.add();
			with (selectedRegion) 
				{
				RegionDoc = radiobuttonControls.add({staticLabel:langDialogDocument, checkedState: prefs.RegionDoc});
				RegionSpread = radiobuttonControls.add({staticLabel:langDialogSpread, checkedState: prefs.RegionSpread});
				RegionPage = radiobuttonControls.add({staticLabel:langDialogPage, checkedState: prefs.RegionPage});
				if (!(RegionDoc.checkedState || RegionSpread.checkedState || RegionPage.checkedState))
					{
					RegionPage.checkedState = true;
					};
				if (myFiles.length > 0) 
					{
					RegionSelected = radiobuttonControls.add({staticLabel:langDialogSelection, checkedState: true});
					}
				}
			}
		with (borderPanels.add().dialogColumns.add()) 
			{
			with (dialogRows.add())
					{
					selectedResize = dialogColumns.add().dialogRows.add().checkboxControls.add({staticLabel: langDialogResize, checkedState: prefs.selectedResize});
					imageRes = dialogColumns.add().dialogRows.add().textEditboxes.add({editContents: prefs.imageResDpi, minWidth:50})
					dialogColumns.add().dialogRows.add().staticTexts.add({staticLabel: "dpi"});
					}
			var selectedMerge = dialogRows.add().checkboxControls.add({staticLabel: langDialogMerge, checkedState: prefs.selectedMerge});
			var selectedCopy = dialogRows.add().checkboxControls.add({staticLabel: langDialogCopy, checkedState: prefs.selectedCopy});
			var selectedAction = dialogRows.add().checkboxControls.add({staticLabel: langDialogRunAction, checkedState: prefs.selectedAction});
			with (dialogRows.add())
					{
					dialogColumns.add().dialogRows.add().staticTexts.add({staticLabel: "Action Set:"});
					ActionSet = dialogColumns.add().dialogRows.add().textEditboxes.add({editContents: prefs.ActionSet, minWidth:90})
					}
			with (dialogRows.add())
					{
					dialogColumns.add().dialogRows.add().staticTexts.add({staticLabel: "Action Name:"});
					ActionName = dialogColumns.add().dialogRows.add().textEditboxes.add({editContents: prefs.ActionName, minWidth:80})
					}
			var selectedCloseAfter = dialogRows.add().checkboxControls.add({staticLabel: langDialogCloseAfterAction, checkedState: prefs.selectedCloseAfter});
			}
		dialogRows.add().staticTexts.add({staticLabel:"\u00A9 Олег Бутрин"});
		dialogRows.add().staticTexts.add({staticLabel:"\u00A9 Леонид Пивнюк"});
		dialogRows.add().staticTexts.add({staticLabel:"Leo3001@mail.ru"});
		}
	
	var myResult = myDialog.show();
	if (!myResult) {
		myDialog.destroy();
		exit();
	}


// сохраняем настройки
prefs.RegionDoc = RegionDoc.checkedState;
prefs.RegionSpread = RegionSpread.checkedState;
prefs.RegionPage = RegionPage.checkedState;
prefs.selectedResize = selectedResize.checkedState;
prefs.imageResDpi = imageRes.editContents;			
prefs.selectedMerge = selectedMerge.checkedState;
prefs.selectedCopy = selectedCopy.checkedState;
prefs.selectedAction = selectedAction.checkedState;
prefs.ActionSet = ActionSet.editContents;
prefs.ActionName = ActionName.editContents;
prefs.selectedCloseAfter = selectedCloseAfter.checkedState;
prefs.save();


//	Проводим выборку файлов и отсеивание на основании выбранных настроек
	switch (selectedRegion.selectedButton) {
		case 0:
			var myFiles = getSelectedImages([myDoc]);
			myFiles = getUniqImages(myFiles);
			myFiles = removeMissingFile(myFiles);
			break;
		case 1:
			var myFiles = getSelectedImages([activeWindow.activeSpread]);
			myFiles = getUniqImages(myFiles);
			myFiles = removeMissingFile(myFiles);
			break;
		case 2:
			var myFiles = getSelectedImages([activeWindow.activePage]);
			myFiles = getUniqImages(myFiles);
			myFiles = removeMissingFile(myFiles);
			break;
	}
//	Если в выборке не осталось ни одного файла, то предупреждаем и выходим
	if (myFiles.length == 0) {
		alert(langAlertNoImages);
		exit();
	}

var myHorSizes = new Array();
var myVertSizes = new Array();
var myEffPpis = new Array();
for (var myCounter = 0; myCounter < myFiles.length; myCounter++) {
	if (myFiles[myCounter].rotationAngle == 0)
		{
		var HorSize = myFiles[myCounter].geometricBounds[3] - myFiles[myCounter].geometricBounds[1];
		var VertSize = myFiles[myCounter].geometricBounds[2] - myFiles[myCounter].geometricBounds[0];
		var HorPpi = myFiles[myCounter].effectivePpi[0]
		var VertPpi = myFiles[myCounter].effectivePpi[1]
		}
	else
		{
		myFiles[myCounter].rotationAngle = 0;
		var HorSize = myFiles[myCounter].geometricBounds[3] - myFiles[myCounter].geometricBounds[1];
		var VertSize = myFiles[myCounter].geometricBounds[2] - myFiles[myCounter].geometricBounds[0];
		var HorPpi = myFiles[myCounter].effectivePpi[0]
		var VertPpi = myFiles[myCounter].effectivePpi[1]
		myDoc.undo()
		};
	if (HorPpi < (imageRes.editContents*0.75) || VertPpi < (imageRes.editContents*0.75)) {
		try {myFiles[myCounter].itemLink.show();}
		catch (e) {app.selection[0] = myFiles[myCounter];}
		alert ("Фото низкого разрешения:  " + HorPpi + " dpi");
		};
	if (HorPpi < (imageRes.editContents*0.85) || HorPpi > (imageRes.editContents*1.15) || VertPpi < (imageRes.editContents*0.85) || VertPpi > (imageRes.editContents*1.15)) {
			myEffPpis.push(true)
		} else { myEffPpis.push(false)
				};
	if (!(VertPpi == HorPpi))
		{
		if (VertPpi < HorPpi)
			{
			HorSize = HorSize * (HorPpi/VertPpi)
			}
		else
			{
			VertSize = VertSize * (VertPpi/HorPpi)
			}
		};
	myHorSizes.push(HorSize);
	myVertSizes.push(VertSize);
	}


//	Создаем в виде текстовой переменной скрипт для Photoshop очень аккуратно и внимательно, посколько любая ошибка приводит к отказу выполнения 
	var myScriptString = "";
//	Получаем список имен файлов и передаем его в запускаемый скрипт
	myScriptString += "var myFiles = " + getImagePath(myFiles).toSource() + ";";
	myScriptString += "var myHorSizes = " + myHorSizes.toSource() + ";";
	myScriptString += "var myVertSizes = " + myVertSizes.toSource() + ";";
	myScriptString += "var myEffPpis = " + myEffPpis.toSource() + ";";
//	myScriptString += "var myImageRes = " + imageRes.toSource() + ";";
	myScriptString += "for (var myCounter = 0; myCounter < myFiles.length; myCounter++) { ";
	myScriptString += "try {";
	myScriptString += "app.open(File(myFiles[myCounter]));";
//      Если нужно сохранить сопию оригинала
	if (selectedCopy.checkedState) {
		myScriptString += "psSaveOptions = new PhotoshopSaveOptions();";
		myScriptString += "{psSaveOptions.alphaChannels = true;";
		myScriptString += "psSaveOptions.annotations = false;";
		myScriptString += "psSaveOptions.embedColorProfile = true;";
		myScriptString += "psSaveOptions.layers = true;";
		myScriptString += "psSaveOptions.maximizeCompatibility = true;";
		myScriptString += "psSaveOptions.spotColors = true; }";
		myScriptString += "myFile = new File (app.activeDocument.fullName + '_copy.psd');";
		myScriptString += "app.activeDocument.saveAs(myFile, psSaveOptions, true, Extension.LOWERCASE);";
	}
//      Если нужно слить слои
	if (selectedMerge.checkedState) {
		myScriptString += "try {";
		myScriptString += "app.activeDocument.mergeVisibleLayers ();";
		myScriptString += "} catch (error) {}";
	}
//      Если нужно поменять разрешение на 300 dpi
	if (selectedResize.checkedState) {
		myScriptString += "preferences.rulerUnits = Units.MM;";
		myScriptString += "if (myEffPpis[myCounter]) { ";
		myScriptString += "app.activeDocument.resizeImage (myHorSizes[myCounter], myVertSizes[myCounter], " + imageRes.editContents + ") };";
	}
//	Передаем экшн
	if (selectedAction.checkedState) {
		myScriptString += "app.doAction(\'" + ActionName.editContents + "\', \'" + ActionSet.editContents + "\');";
	}
//      Если нужно закрыть после обработки
	if (selectedCloseAfter.checkedState) {
		myScriptString += "app.activeDocument.close(SaveOptions.SAVECHANGES);";
	}
	myScriptString += "} catch (error) {alert(error)}";
	myScriptString += "}";
//	Создаем и выполняем объект BridgeTalk	
	if (executeTarget("photoshop")) {
		var bt = new BridgeTalk;
		bt.target = "photoshop";
		bt.body = myScriptString;
		bt.send();
	} else {
		alert(langAlertPhotoshopNotStarted);
		myDialog.destroy();
		exit();
	}	
	myDialog.destroy();
	exit();
}