	//========================================================================================
// "Разбиение текстового фрейма на несколько по строкам"
//                (BreakTextLine.js)
//
// Версия 2.0
//
//    Скрипт разбивает указанный текстовый фрейм по строкам на несколько.
// Перед запуском необходимо выделить текстовый фрейм. Сохраняется исходное
// форматирование текста.
//    
// 1.1 Исправлена ошибка со страницами
//
// 2.0 Добавлена морда лица, возможность выбора принципа разбиения - по строкам
//     или по абзацам.
// 2.1 К выходным текстовым фреймам применяется fit
//
// Автор: Андрей Рыжков (ragman)
//
// Дата: 11.03.2005 г.
//
//=========================================================================================
nameScript = "Разбиение текста"
verScript = "v 2.1"

// Умолчания
textBreak = 0;

with (app) {
//Проверяем, что у нас выделено
	if ((selection.length == 1)&&((selection[0].constructor.name == "TextFrame"))) {
	} else {
		alert("Необходимо вытелить один текстовый фрейм");
		exit();
	}
	
// Морда лица

// Создаем список принципов разбиения
	var myBreakStyle = new Array('по строкам','по абзацам');
// Создаем диалог
	var myDialog = dialogs.add({name:nameScript + " " + verScript});
// Подготовка
	with (myDialog.dialogColumns.add()) {
		with (dialogRows.add().borderPanels.add().dialogColumns.add()) {
			with (dialogRows.add()) {
				staticTexts.add({staticLabel:"Разбивать текст"});
				var myDialogtextBreak = dropdowns.add({stringList:myBreakStyle, selectedIndex:textBreak});
			}
		}
		with (dialogRows.add()) {
			dialogColumns.add().staticTexts.add({staticLabel:"Андрей Рыжков     special946@gmail.com"});
		}
	}
// Показываем
	var myResult = myDialog.show();
	if (!myResult) {
		myDialog.destroy();
		exit();
	}
	textBreak = myDialogtextBreak.selectedIndex;
	
// Определяем количество линий во фрейме
	var myStory = selection[0];
	var pageNum = myStory.parent.id;
	var myPage = activeDocument.pages.itemByID(pageNum);

switch (textBreak) {
	case 0: // Перебор по всем линиям
		var linesFrameCount = myStory.lines.length;
		var strLine = "";
		for (myCount = 0; myCount < linesFrameCount; myCount++) {
			var myNewFrame = myPage.textFrames.add();
			strLine = myStory.lines[myCount].select(1919250519);
			app.copy();
			strX = myStory.geometricBounds[1];
			strVert = myStory.lines[myCount].texts[0].pointSize;
			strY = myStory.lines[myCount].baseline-strVert*0.2565;
			strHor = myStory.geometricBounds[3];
			with (myNewFrame){
				geometricBounds = [strY, strX, strY+strVert*0.2565+100, strHor];
				insertionPoints[0].select(1919250519);
				app.paste();
				fit(given = 1718906723);
			}
		}
        	break;

	case 1: // Перебор по всем абзацам
		var paragraphCount = myStory.paragraphs.length;
		var strLine = "";
		for (myCount = 0; myCount < paragraphCount; myCount++) {
			var myNewFrame = myPage.textFrames.add();
			strLine = myStory.paragraphs[myCount].select(1919250519);
			app.copy();
			strX = myStory.geometricBounds[1];
			strVert = myStory.paragraphs[myCount].texts[0].pointSize;			
			strY = myStory.paragraphs[myCount].baseline-strVert*0.2565;
			strHor = myStory.geometricBounds[3];
			with (myNewFrame){
				geometricBounds = [strY, strX, strY+strVert*0.2565*(myStory.paragraphs[myCount].lines.length + 1), strHor];
				insertionPoints[0].select(1919250519);
				app.paste();
				fit(given = 1718906723);
			}
		}
        	break;
}
}